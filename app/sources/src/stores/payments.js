/**
 * Entrypoint of all payments store
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';

import { denominations, accounts, vendors } from 'stores';

import { createDataFetcher, round } from './dataGeneric';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const payments = {
  round,
  getTotal(payment) {
    return payment.direction === 'incoming'
      ? Number(payment.amount)
      : -1 * Number(payment.amount) - Number(payment.fees.total);
  },
  async calcDenominations(payment) {
    if (!denominations.get.data) {
      await denominations.get.run();
    }

    const result = { denominations: {} };
    Object.keys(denominations.get.data[payment.asset]).forEach(denomination => {
      const total =
        payments.getTotal(payment) * denominations.get.data[payment.asset][denomination].price;
      const amount = payment.amount * denominations.get.data[payment.asset][denomination].price;
      const fees = payment.fees.total * denominations.get.data[payment.asset][denomination].price;
      result.denominations[denomination] = {
        ...denominations.get.data[payment.asset][denomination],
        totalRaw: total,
        total: denominations.get.data[payment.asset][denomination].round(total),
        amount: denominations.get.data[payment.asset][denomination].round(amount),
        fees: denominations.get.data[payment.asset][denomination].round(fees),
      };

      result.denominations[denomination].toString = ({ omitDirection, omitSign } = {}) => {
        return {
          total: denominations.get.data[payment.asset][denomination].stringify(total, {
            omitDirection,
            omitSign,
          }),
          amount: denominations.get.data[payment.asset][denomination].stringify(amount, {
            omitDirection,
            omitSign,
          }),
          fees: denominations.get.data[payment.asset][denomination].stringify(fees, {
            omitDirection,
            omitSign,
          }),
        };
      };
    });

    return result;
  },
  send: createDataFetcher({
    name: 'PaymentsSend',
    async fetchOptions() {
      return {
        url: '/payments/send',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
      };
    },
    async run(to, amount, asset, { origin } = {}) {
      return this.startFetching({
        body: { to, amount, asset, origin },
      });
    },
    onError(error) {
      if (error.code.match('^401.*$')) {
        this.cleanup('all');
        accounts.authenticate.cleanup('all');
      }
    },
  }),
  estimate: createDataFetcher({
    name: 'PaymentsEstimate',
    async fetchOptions() {
      return {
        url: '/payments/send?estimate=true',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
      };
    },
    async parseData(payment) {
      return {
        ...payment,
        ...(await payments.calcDenominations(payment)),
      };
    },
    async parseError(error, options) {
      return {
        ...error,
        ...(await payments.calcDenominations({ ...error, ...JSON.parse(options.body) })),
      };
    },
    async run(to, amount, asset, fixedAmount, { origin } = {}) {
      return this.startFetching({
        debounce: !fixedAmount && amount != 0 ? 500 : undefined,
        body: { to, amount, asset, origin },
      });
    },
    onError(error) {
      if (error.code.match('^401.*$')) {
        this.cleanup('all');
        accounts.authenticate.cleanup('all');
      }
    },
  }),
  receive: createDataFetcher({
    name: 'PaymentsReceive',
    async fetchOptions() {
      return {
        url: '/payments/receive',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
      };
    },
    async run(type, amount, asset) {
      return this.startFetching({
        body: { type, amount, asset },
      });
    },
    onError(error) {
      if (error.code.match('^401.*$')) {
        this.cleanup('all');
        accounts.authenticate.cleanup('all');
      }
    },
  }),
};

payments.get = createDataFetcher({
  name: 'PaymentsGet',
  async fetchOptions() {
    return {
      url: '/payments',
      localFirst: true,
      preserveDataOnError: true,
      headers: {
        Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
      },
    };
  },
  async parseData(data) {
    return Promise.all(
      data.map(async payment => {
        let vendor = {};
        if (!payment.vendorName) {
          const randomVandor = vendors.getRandom(payment.vuid)[0];
          vendor = {
            vendorName: randomVandor.name,
            vendorIcon: randomVandor.iconUrl,
            vendorColor: randomVandor.color,
          };
        }

        return {
          ...payment,
          ...vendor,
          ...(await payments.calcDenominations(payment)),
        };
      }),
    );
  },
  onError(error) {
    if (error.code.match('^401.*$')) {
      this.cleanup('all');
      accounts.authenticate.cleanup('all');
    }
  },
});
payments.getById = createDataFetcher({
  name: 'PaymentsGetById',
  fetchOptions({ puid } = {}) {
    if (payments.get.data) {
      const paymentFound = payments.get.data.find(payment => payment.puid === puid);
      if (paymentFound) {
        return {
          localOnly: true,
          defaultValue: { data: [paymentFound] },
        };
      }
    }
    return {
      url: `/payments/${puid}`,
      headers: {
        Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
      },
    };
  },
  parseData(data) {
    return Promise.all(
      data.map(async payment => {
        let vendor = {};
        if (!payment.vendorName) {
          const randomVandor = vendors.getRandom(payment.vuid)[0];
          vendor = {
            vendorName: randomVandor.name,
            vendorIcon: randomVandor.iconUrl,
            vendorColor: randomVandor.color,
          };
        }

        return {
          ...payment,
          ...vendor,
          ...(await payments.calcDenominations(payment)),
        };
      }),
    );
  },
  onError(error) {
    if (error.code.match('^401.*$')) {
      this.cleanup('all');
      accounts.authenticate.cleanup('all');
    }
  },
});

export default payments;
