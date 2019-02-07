/**
 * Entrypoint of all app stores
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import log from 'utils/logging';
import LiveChat from 'utils/LiveChat';

import vendorShark from 'assets/icons/vendors/shark.svg';
import vendorBear from 'assets/icons/vendors/bear.svg';
import vendorBird from 'assets/icons/vendors/bird.svg';
import vendorDog from 'assets/icons/vendors/dog.svg';
import vendorCat from 'assets/icons/vendors/cat.svg';
import vendorLion from 'assets/icons/vendors/lion.svg';
import vendorFrog from 'assets/icons/vendors/frog.svg';
import vendorChicken from 'assets/icons/vendors/chicken.svg';
import vendorElephant from 'assets/icons/vendors/elephant.svg';
import vendorFish from 'assets/icons/vendors/fish.svg';
import vendorGorilla from 'assets/icons/vendors/gorilla.svg';
import vendorHorse from 'assets/icons/vendors/horse.svg';
import vendorPenguin from 'assets/icons/vendors/penguin.svg';
import vendorSquirrel from 'assets/icons/vendors/squirrel.svg';

import { createNewStore } from './dataGeneric';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const getApiUrl = string => {
  if (process.env.NODE_ENV === 'development') {
    return `http://lvh.me:3004${string}`;
  }
  return `https://api.bitlum.io${string}`;
};

function round(number, precision, precisionMax) {
  const rounded =
    (Math.sign(number) * Math.round(Math.abs(number) * 10 ** precision)) / 10 ** precision;

  if (Number.isInteger(rounded) && precision < precisionMax) {
    return round(number, precision + 1, precisionMax);
  }

  return rounded;
}

const denominations = {
  BTC: {
    USD: {
      price: 4000,
      sign: 'USD',
      precision: 2,
      precisionMax: 5,
      round(number) {
        return round(number, this.precision, this.precisionMax);
      },
      stringify(number, { omitDirection = false, omitSign = false } = {}) {
        return `${omitDirection ? '' : number === 0 ? '' : number > 0 ? '+ ' : '- '}${
          omitSign ? '' : `${this.sign} `
        }${this.round(Math.abs(number))
          .toFixed(this.precisionMax || 1)
          .replace(/0+$/, '')
          .replace(/\.$/, '')}`;
      },
    },
    SAT: {
      price: 10 ** 8,
      sign: 'SAT',
      precision: 0,
      precisionMax: 0,
      round(number) {
        return round(number, this.precision, this.precisionMax);
      },
      stringify(number, { omitDirection = false, omitSign = false } = {}) {
        return `${omitDirection ? '' : number === 0 ? '' : number > 0 ? '+ ' : '- '}${
          omitSign ? '' : `${this.sign} `
        }${this.round(Math.abs(number))
          .toFixed(this.precisionMax || 1)
          .replace(/0+$/, '')
          .replace(/\.$/, '')}`;
      },
    },
  },
};

const settings = {
  default: {
    content_script_permissions: undefined,
    denominations: {
      BTC: {
        main: denominations.BTC.USD,
        additional: denominations.BTC.SAT,
      },
    },
  },
};

settings.get = createNewStore({
  name: 'SettingsGet',
  data: (() => {
    try {
      return {
        ...JSON.parse(localStorage.getItem('settings')),
        denominations: settings.default.denominations,
      };
    } catch (error) {
      log.error(`Unable to read settings from local storage (${error.message})`);
      return undefined;
    }
  })(),
  async run() {
    try {
      const savedSettings = {
        ...JSON.parse(localStorage.getItem('settings')),
        denominations: settings.default.denominations,
      };
      this.updateData(savedSettings);
    } catch (error) {
      const message = `Unable to read settings from local storage (${error.message})`;
      log.error(message);
      this.updateError({ error: { message, code: 500 } });
    }
  },
});

settings.set = createNewStore({
  name: 'SettingsSet',
  async run(name, value) {
    let oldSettings;
    try {
      oldSettings = JSON.parse(localStorage.getItem('settings')) || settings.default;
    } catch (error) {
      const message = `Unable to read settings from local storage (${error.message})`;
      log.error(message);
      this.updateError({ error: { message, code: 500 } });
    }
    oldSettings[name] = value;
    try {
      localStorage.setItem('settings', JSON.stringify(oldSettings));
      this.updateData(oldSettings);
    } catch (error) {
      const message = `Unable to save settings from local storage (${error.message})`;
      log.error(message);
      this.updateError({ error: { message, code: 500 } });
    }
  },
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
    url: getApiUrl`/accounts/auth`,
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
    url: getApiUrl`/accounts`,
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
      return accounts.parseData(JSON.parse(localStorage.getItem('accountData')));
    } catch (error) {
      log.error(`Unable to read account data from local storage (${error.message})`);
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
    url: getApiUrl`/accounts`,
  },
  async run() {
    const oldData = this.data;
    const result = await this.startFetching({
      headers: {
        Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
      },
    });
    if (result.error && result.error.code.match('^401.*$')) {
      accounts.authenticate.cleanup();
    }
    if (result.error && oldData) {
      this.updateData(oldData);
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
        totalRaw: total,
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
    async run(to, amount, asset, { origin } = {}) {
      const result = await this.startFetching({
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
        body: { to, amount, asset, origin },
      });
      if (result.error && result.error.code.match('^401.*$')) {
        accounts.authenticate.cleanup();
      }
      return result;
    },
    fetchOptions: {
      url: getApiUrl`/payments/send`,
      method: 'POST',
    },
  }),
  estimate: createNewStore({
    name: 'PaymentsEstimate',
    async run(to, amount, asset, { origin } = {}) {
      const result = await this.startFetching({
        url: `${this.fetchOptions.url}'' : ''}`,
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
        body: { to, amount, asset, origin },
      });
      if (result.error && result.error.code.match('^401.*$')) {
        accounts.authenticate.cleanup();
      }
    },
    fetchOptions: {
      url: getApiUrl`/payments/send?estimate=true`,
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
        accounts.authenticate.cleanup();
      }
    },
    fetchOptions: {
      url: getApiUrl`/payments/receive`,
      method: 'POST',
    },
  }),
};

payments.get = createNewStore({
  name: 'PaymentsGet',
  parseData(data) {
    return data.map(payment => {
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
      accounts.authenticate.cleanup();
    }
  },
  fetchOptions: {
    url: getApiUrl`/payments`,
  },
});
payments.getById = createNewStore({
  name: 'PaymentsGetById',
  parseData(data) {
    return data.map(payment => {
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
      accounts.authenticate.cleanup();
    }
  },
  fetchOptions: {
    url: getApiUrl`/payments`,
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
      url: getApiUrl`/wallets/details`,
    },
  }),
};

const vendors = {
  randomVendors: (() =>
    [].concat(
      ...[
        { name: 'Shark', iconUrl: vendorShark },
        { name: 'Bear', iconUrl: vendorBear },
        { name: 'Bird', iconUrl: vendorBird },
        { name: 'Dog', iconUrl: vendorDog },
        { name: 'Cat', iconUrl: vendorCat },
        { name: 'Lion', iconUrl: vendorLion },
        { name: 'Frog', iconUrl: vendorFrog },
        { name: 'Chicken', iconUrl: vendorChicken },
        { name: 'Elephant', iconUrl: vendorElephant },
        { name: 'Fish', iconUrl: vendorFish },
        { name: 'Gorilla', iconUrl: vendorGorilla },
        { name: 'Horse', iconUrl: vendorHorse },
        { name: 'Penguin', iconUrl: vendorPenguin },
        { name: 'Squirrel', iconUrl: vendorSquirrel },
      ].map(character =>
        [
          { color: '#e57373', name: 'Red' },
          { color: '#F06292', name: 'Pink' },
          { color: '#BA68C8', name: 'Purple' },
          { color: '#9575CD', name: 'Violet' },
          { color: '#7986CB', name: 'Indigo' },
          { color: '#64B5F6', name: 'Blue' },
          { color: '#4FC3F7', name: 'Sky' },
          { color: '#4DD0E1', name: 'Cyan' },
          { color: '#4DB6AC', name: 'Teal' },
          { color: '#81C784', name: 'Green' },
          { color: '#AED581', name: 'Grass' },
          { color: '#DCE775', name: 'Lime' },
          { color: '#FFF176', name: 'Yellow' },
          { color: '#FFD54F', name: 'Amber' },
          { color: '#FFB74D', name: 'Orange' },
          { color: '#A1887F', name: 'Brown' },
          { color: '#E0E0E0', name: 'Grey' },
          { color: '#90A4AE', name: 'Livid' },
        ].map(color => ({
          ...character,
          ...color,
          name: `${color.name} ${character.name}`,
        })),
      ),
    ))(),
  generateUnique(usedNames) {
    const unusedVendors = this.randomVendors.filter(vendor => !usedNames.includes(vendor.name));
    return unusedVendors[Math.floor(Math.random() * unusedVendors.length)];
  },
  getRandom(vuid) {
    let savedRandom;
    try {
      savedRandom = JSON.parse(localStorage.getItem('randomizedVendors')) || {};
    } catch (e) {
      savedRandom = {};
      log.error(e);
    }
    const usedNames = Object.keys(savedRandom).map(vuidSaved => savedRandom[vuidSaved].name);
    if (savedRandom[vuid]) {
      return [savedRandom[vuid]];
    }
    const generated = this.generateUnique(usedNames);
    localStorage.setItem(
      'randomizedVendors',
      JSON.stringify({ [vuid]: generated, ...savedRandom }),
    );
    return [generated];
  },
};

vendors.get = createNewStore({
  name: 'VendorsGet',
  async run(vuid, { origin = '' } = {}) {
    this.startFetching({
      url: `${this.fetchOptions.url}/${vuid}?origin=${origin}`,
      vuid,
    });
  },
  parseData(data, options) {
    if (data.length === 0) {
      return vendors.getRandom(options.vuid);
    }
    return data;
  },
  fetchOptions: {
    url: getApiUrl`/vendors`,
  },
});

export { payments, accounts, wallets, settings, vendors };

export default { payments, accounts, wallets, settings, vendors };
