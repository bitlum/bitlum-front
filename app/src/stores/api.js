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

const GenericApiCallStore = {
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

  async load(options = {}) {
    if (this.loading) {
      log.debug(`${this.fetchOptions.url} is already loading`);
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
  const newStore = Object.assign({}, GenericApiCallStore, store);
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

export const Authorize = createNewStore({
  name: 'Authorize',
  fetchOptions: {
    url: '/api/accounts/auth',
    method: 'POST',
  },
});

export const Payments = createNewStore({
  name: 'Payments',
  fetchOptions: {
    url: '/api/payments',
  },
});

export const sendPayment = createNewStore({
  name: 'SendPayment',
  fetchOptions: {
    url: '/api/payments/send',
    method: 'POST',
  },
});

export default { Payments, Authorize, sendPayment };
