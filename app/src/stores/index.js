import { decorate, computed, action, observable } from 'mobx';

import log from 'utils/logging';

const fetchData = (url, options) =>
  fetch(url, options)
    .then(res => res.json())
    .catch(error => {
      log.error(error);
      return {
        error: { message: 'Error occuried during data fetching', code: error.code || 500 },
      };
    });

const GenericApiStore = {
  fetchOptions: { url: '/api' },

  fetch: fetchData,

  loading: undefined,

  startedAt: undefined,

  finishedAt: undefined,

  data: undefined,

  error: undefined,

  loadingStart() {
    this.loading = true;
    this.startedAt = new Date().getTime();
  },

  loadingFinish() {
    this.loading = false;
    this.finishedAt = new Date().getTime();
  },

  updateData(data) {
    if (!this.data || !data) {
      this.data = data;
    } else {
      Object.assign(this.data, data);
    }
  },

  updateError(error) {
    if (!this.error || !error) {
      this.error = error;
    } else {
      Object.assign(this.error, error);
    }
  },

  async run() {
    return this.startFetching();
  },

  async startFetching(options = {}) {
    if (this.loading) {
      log.debug(`${this.name} is already loading`);
      return;
    }
    const parsedOptions = {
      ...this.fetchOptions,
      ...options,
    };
    if (parsedOptions.body && typeof options.body !== 'string') {
      try {
        parsedOptions.body = JSON.stringify(parsedOptions.body);
      } catch (err) {
        log.error(err);
        const error = { message: `Failed to stringify request body, ${options.body}`, code: 500 };
        this.updateError(error);
        return;
      }
      if (!parsedOptions.headers) parsedOptions.headers = {};
      parsedOptions.headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    this.loadingStart();
    const response = await this.fetch(parsedOptions.url, parsedOptions);
    this.updateData(response.data);
    this.updateError(response.error);
    this.loadingFinish();
  },
};

function createNewStore(store) {
  const newStore = Object.defineProperties(
    { ...GenericApiStore },
    Object.getOwnPropertyDescriptors(store),
  );
  decorate(newStore, {
    loading: observable,
    error: observable,
    data: observable,
    loadingStart: action(`Loading started (${newStore.name})`),
    loadingFinish: action(`Loading finished (${newStore.name})`),
    updateError: action(`Error updated (${newStore.name})`),
    updateData: action(`Data updated (${newStore.name})`),
  });
  return newStore;
}

export const accounts = {
  authenticate: createNewStore({
    name: 'AccountsAuthenticate',
    data: (() => {
      try {
        return JSON.parse(localStorage.getItem('authData'));
      } catch (error) {
        log.error(`Unable to read auth data from local storage (${error.message})`);
        return undefined;
      }
    })(),
    fetchOptions: {
      url: '/api/accounts/auth',
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
      accounts.get.updateData(data);
    },
    async run(email, password) {
      this.startFetching({ body: { email, password } });
    },
    get isAuthenticated() {
      return !!(this.data && this.data.token);
    },
  }),
  get: createNewStore({
    name: 'AccountsAuthenticate',
    data: (() => {
      try {
        return JSON.parse(localStorage.getItem('authData'));
      } catch (error) {
        log.error(`Unable to read auth data from local storage (${error.message})`);
        return undefined;
      }
    })(),
    fetchOptions: {
      url: '/api/accounts',
    },
    run() {
      this.startFetching({
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
      });
    },
  }),
};

const payments = {
  get: createNewStore({
    name: 'PaymentsGet',
    run() {
      this.startFetching({
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
      });
    },
    fetchOptions: {
      url: '/api/payments',
    },
  }),
  send: createNewStore({
    name: 'PaymentsSend',
    run(to, amount, asset) {
      this.startFetching({
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
        body: { to, amount, asset },
      });
    },
    fetchOptions: {
      url: '/api/payments/send',
      method: 'POST',
    },
  }),
  receive: createNewStore({
    name: 'PaymentsReceive',
    run(type, amount, asset) {
      this.startFetching({
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
        body: { type, amount, asset },
      });
    },
    fetchOptions: {
      url: '/api/payments/receive',
      method: 'POST',
    },
  }),
};

export default { payments, accounts };
