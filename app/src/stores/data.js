/**
 * Entrypoint of all app stores
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import log from 'utils/logging';
import LiveChat from 'utils/LiveChat';

import { createNewStore } from './dataGeneric';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const getApiUrl = strings => {
  const urlsWithoutApi = strings.map(string => string.replace(/^\/api/, ''));
  if (process.env.NODE_ENV === 'development') {
    return `http://lvh.me:3004${urlsWithoutApi}`;
  }
  return `https://api.bitlum.io${urlsWithoutApi}`;
};

function round(number, precision, precisionMax) {
  const rounded =
    (Math.sign(number) * Math.floor(Math.abs(number) * 10 ** precision)) / 10 ** precision;

  if (Number.isInteger(rounded) && precision < precisionMax) {
    return round(number, precision + 1, precisionMax);
  }

  return rounded;
}

const settings = {
  default: {
    denominations: {
      BTC: {
        main: {
          price: 4000,
          sign: 'USD',
          precision: 2,
          precisionMax: 4,
          round(number) {
            return round(number, this.precision, this.precisionMax);
          },
          stringify(number, { omitDirection = false, omitSign = false } = {}) {
            return `${omitSign ? '' : this.sign} ${
              omitDirection ? '' : number === 0 ? '' : number > 0 ? '+' : '-'
            }${this.round(Math.abs(number))
              .toFixed(this.precisionMax || 1)
              .replace(/0+$/, '')
              .replace(/\.$/, '')}`;
          },
        },
        additional: {
          price: 10 ** 8,
          sign: 'SAT',
          precision: 0,
          precisionMax: 0,
          round(number) {
            return round(number, this.precision, this.precisionMax);
          },
          stringify(number, { omitDirection = false, omitSign = false } = {}) {
            return `${omitSign ? '' : this.sign} ${
              omitDirection ? '' : number === 0 ? '' : number > 0 ? '+' : '-'
            }${this.round(Math.abs(number))
              .toFixed(this.precisionMax || 1)
              .replace(/0+$/, '')
              .replace(/\.$/, '')}`;
          },
        },
      },
    },
  },
};

settings.get = createNewStore({
  name: 'SettingsGet',
  data: (() => {
    try {
      return JSON.parse(localStorage.getItem('settings')) || settings.default;
    } catch (error) {
      log.error(`Unable to read settings from local storage (${error.message})`);
      return undefined;
    }
  })(),
});

const accounts = {
  round,
  calcDenominations(balances) {
    const result = { ...balances };
    Object.keys(balances).forEach(balance => {
      result[balance] = { ...balances[balance] };
      result[balance].denominationsAvailable = {};
      result[balance].denominationsPending = {};
      Object.keys(settings.get.data.denominations[balance]).forEach(denomination => {
        const amountAvailable = settings.get.data.denominations[balance][denomination].round(
          balances[balance].available *
            settings.get.data.denominations[balance][denomination].price,
        );

        const amountPending = settings.get.data.denominations[balance][denomination].round(
          balances[balance].pending * settings.get.data.denominations[balance][denomination].price,
        );

        result[balance].denominationsAvailable[denomination] = {
          ...settings.get.data.denominations[balance][denomination],
          amountAvailable,
        };
        result[balance].denominationsAvailable[denomination].toString = () => {
          return settings.get.data.denominations[balance][denomination].stringify(amountAvailable, {
            omitDirection: true,
          });
        };

        result[balance].denominationsPending[denomination] = {
          ...settings.get.data.denominations[balance][denomination],
          amountPending,
        };
        result[balance].denominationsPending[denomination].toString = () => {
          return settings.get.data.denominations[balance][denomination].stringify(amountPending, {
            omitDirection: true,
          });
        };
      });
    });

    return result;
  },
};
accounts.parseData = data => ({
  ...data,
  balances: { ...accounts.calcDenominations(data.balances) },
});

accounts.authenticate = createNewStore({
  name: 'AccountsAuthenticate',
  data: (() => {
    try {
      return JSON.parse(localStorage.getItem('authData'));
    } catch (error) {
      log.error(`Unable to read auth data from local storage (${error.message})`);
      return undefined;
    }
  })(),
  parseData: accounts.parseData,
  fetchOptions: {
    url: getApiUrl`/api/accounts/auth`,
    method: 'POST',
  },
  updateData(data) {
    try {
      localStorage.setItem('authData', JSON.stringify(data));
    } catch (error) {
      log.error(`Unable to save auth data to local storage (${error.message})`);
    }
    if (!this.data || !data) {
      this.data = data;
    } else {
      Object.assign(this.data, data);
    }
    LiveChat.boot({
      email: data && data.email,
      user_id: data && data.auid,
      created_at: data && data.createdAt,
    });
    accounts.get.updateData(data);
  },
  async run(email, password) {
    this.startFetching({ body: { email, password } });
  },
  cleanup() {
    LiveChat.endSession();
    this.updateData(undefined);
    this.updateError(undefined);
    Object.keys(payments).forEach(method => {
      payments[method].cleanup && payments[method].cleanup();
    });
  },
  get isAuthenticated() {
    return !!(this.data && this.data.token);
  },
});

accounts.signup = createNewStore({
  name: 'AccountsSignup',
  fetchOptions: {
    url: getApiUrl`/api/accounts`,
    method: 'POST',
  },
  parseData: accounts.parseData,
  updateData(data) {
    try {
      localStorage.setItem('authData', JSON.stringify(data));
    } catch (error) {
      log.error(`Unable to save auth data to local storage (${error.message})`);
    }
    if (!this.data || !data) {
      this.data = data;
    } else {
      Object.assign(this.data, data);
    }
    accounts.authenticate.updateData(data);
    accounts.get.updateData(data);
  },
  async run(email, password, referralPassed) {
    let referral = referralPassed;
    if (!referral) referral = localStorage.getItem('referral') || email;
    this.startFetching({ body: { email, password, referral } });
  },
});

accounts.get = createNewStore({
  name: 'AccountsAuthenticate',
  data: (() => {
    try {
      return JSON.parse(localStorage.getItem('accountData'));
    } catch (error) {
      log.error(`Unable to read auth data from local storage (${error.message})`);
      return undefined;
    }
  })(),
  updateData(data) {
    try {
      localStorage.setItem('accountData', JSON.stringify(data));
    } catch (error) {
      log.error(`Unable to save account data to local storage (${error.message})`);
    }
    if (!this.data || !data) {
      this.data = data;
    } else {
      Object.assign(this.data, data);
    }
  },
  parseData: accounts.parseData,
  fetchOptions: {
    url: getApiUrl`/api/accounts`,
  },
  async run() {
    const result = await this.startFetching({
      headers: {
        Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
      },
    });
    if (result.error && result.error.code.match('^401.*$')) {
      accounts.authenticate.signout();
    }
  },
});

const payments = {
  round,
  getTotal(payment) {
    return payment.direction === 'incoming'
      ? Number(payment.amount)
      : -1 * Number(payment.amount) - Number(payment.fees.total);
  },
  calcDenominations(payment) {
    const result = { denominations: {} };
    Object.keys(settings.get.data.denominations[payment.asset]).forEach(denomination => {
      const total =
        payments.getTotal(payment) *
        settings.get.data.denominations[payment.asset][denomination].price;
      const amount =
        payment.amount * settings.get.data.denominations[payment.asset][denomination].price;
      const fees =
        payment.fees.total * settings.get.data.denominations[payment.asset][denomination].price;
      result.denominations[denomination] = {
        ...settings.get.data.denominations[payment.asset][denomination],
        total: settings.get.data.denominations[payment.asset][denomination].round(total),
        amount: settings.get.data.denominations[payment.asset][denomination].round(amount),
        fees: settings.get.data.denominations[payment.asset][denomination].round(fees),
      };

      result.denominations[denomination].toString = ({ omitDirection, omitSign } = {}) => {
        return {
          total: settings.get.data.denominations[payment.asset][denomination].stringify(total, {
            omitDirection,
            omitSign,
          }),
          amount: settings.get.data.denominations[payment.asset][denomination].stringify(amount, {
            omitDirection,
            omitSign,
          }),
          fees: settings.get.data.denominations[payment.asset][denomination].stringify(fees, {
            omitDirection,
            omitSign,
          }),
        };
      };
    });

    return result;
  },
  send: createNewStore({
    name: 'PaymentsSend',
    async run(to, amount, asset) {
      const result = await this.startFetching({
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
        body: { to, amount, asset },
      });
      if (result.error && result.error.code.match('^401.*$')) {
        accounts.authenticate.signout();
      }
    },
    fetchOptions: {
      url: getApiUrl`/api/payments/send`,
      method: 'POST',
    },
  }),
  estimate: createNewStore({
    name: 'PaymentsEstimate',
    async run(to, amount, asset) {
      const result = await this.startFetching({
        url: `${this.fetchOptions.url}'' : ''}`,
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
        body: { to, amount, asset },
      });
      if (result.error && result.error.code.match('^401.*$')) {
        accounts.authenticate.signout();
      }
    },
    fetchOptions: {
      url: getApiUrl`/api/payments/send?estimate=true`,
      method: 'POST',
    },
  }),
  receive: createNewStore({
    name: 'PaymentsReceive',
    async run(type, amount, asset) {
      const result = await this.startFetching({
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
        body: { type, amount, asset },
      });
      if (result.error && result.error.code.match('^401.*$')) {
        accounts.authenticate.signout();
      }
    },
    fetchOptions: {
      url: getApiUrl`/api/payments/receive`,
      method: 'POST',
    },
  }),
};

payments.get = createNewStore({
  name: 'PaymentsGet',
  parseData(data) {
    return data.map(payment => {
      return {
        ...payment,
        ...payments.calcDenominations(payment),
      };
    });
  },
  async run() {
    const result = await this.startFetching({
      headers: {
        Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
      },
    });
    if (result.error && result.error.code.match('^401.*$')) {
      accounts.authenticate.signout();
    }
  },
  fetchOptions: {
    url: getApiUrl`/api/payments`,
  },
});
payments.getById = createNewStore({
  name: 'PaymentsGetById',
  parseData(data) {
    return data.map(payment => {
      return {
        ...payment,
        ...payments.calcDenominations(payment),
      };
    });
  },
  async run(puid) {
    if (payments.get.data) {
      const paymentFound = payments.get.data.find(payment => payment.puid === puid);
      if (paymentFound) {
        this.loadingStart();
        this.updateData([paymentFound]);
        this.updateError(undefined);
        this.loadingFinish();
        return;
      }
    }
    const result = await this.startFetching({
      url: `${this.fetchOptions.url}/${puid}`,
      headers: {
        Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
      },
    });

    if (result.error && result.error.code.match('^401.*$')) {
      accounts.authenticate.signout();
    }
  },
  fetchOptions: {
    url: getApiUrl`/api/payments`,
  },
});

const wallets = {
  getDetails: createNewStore({
    name: 'WalletsGetDetails',
    async run(wuid, asset) {
      return this.startFetching({
        url: `${this.fetchOptions.url}?asset=${asset}&wuid=${wuid}`,
        wuid,
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
      });
    },
    fetchOptions: {
      url: getApiUrl`/api/wallets/details`,
    },
  }),
};

const vendors = {
  get: createNewStore({
    name: 'VendorsGet',
    async run(vuid) {
      this.startFetching({
        url: `${this.fetchOptions.url}/${vuid}`,
      });
    },
    fetchOptions: {
      url: getApiUrl`/api/vendors`,
    },
  }),
};

export { payments, accounts, wallets, settings, vendors };

export default { payments, accounts, wallets, settings, vendors };
