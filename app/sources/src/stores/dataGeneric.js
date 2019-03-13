/**
 * Generic store for creation of API calls stores with loading states
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import { decorate, action, observable, runInAction } from 'mobx';

import logger from 'utils/logging';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const fetchOnline = (url, options) =>
  fetch(url, options)
    .then(res => res.json())
    .catch(error => {
      log.error(error);
      return {
        error: { message: 'Error occuried during data fetching', code: error.code || '500___000' },
      };
    });

const getLocal = (name, options) => {
  const updatedAt = localStorage.getItem(`${name}_updatedAt`) || -Infinity;
  if (new Date() - updatedAt > options.localLifetime) {
    const error = {
      message: `Locally stored ${name} is outdated`,
      code: '500___000',
    };
    log.debug(error.message);
    return { error };
  }
  try {
    return JSON.parse(localStorage.getItem(name)) || undefined;
  } catch (error) {
    log.error(error);
    return {
      error: {
        message: `Unable to read ${name} from local storage (${error.message})`,
        code: error.code || '500___000',
      },
    };
  }
};

const setLocal = (name, options) => {
  try {
    localStorage.setItem(name, JSON.stringify(options.body));
    localStorage.setItem(`${name}_updatedAt`, new Date().getTime());
    return options.body;
  } catch (error) {
    log.error(error);
    return {
      error: {
        message: `Unable to save ${name} to local storage (${error.message})`,
        code: error.code || '500___000',
      },
    };
  }
};

const cleanupLocal = name => {
  localStorage.removeItem(name);
  localStorage.removeItem(`${name}_updatedAt`);
};

function round(number, precision, precisionMax) {
  const rounded =
    (Math.sign(number) * Math.round(Math.abs(number) * 10 ** precision)) / 10 ** precision;

  if (Number.isInteger(rounded) && precision < precisionMax) {
    return round(number, precision + 1, precisionMax);
  }

  return rounded;
}

const getApiUrl = string => {
  if (process.env.NODE_ENV === 'development') {
    return `http://lvh.me:3004${string}`;
  }
  return `https://api.bitlum.io${string}`;
};

const GenericApiStore = {
  fetchOptionsDefault: {
    url: '/api',
    localOnly: false,
    localFirst: false,
    localLifetime: Infinity,
    preserveDataOnError: false,
    preventRefetch: true,
  },

  loading: undefined,

  debouncing: undefined,

  startedAt: -Infinity,

  finishedAt: -Infinity,

  dataUpdatedAt: -Infinity,

  errorUpdatedAtAt: -Infinity,

  latestOnlineFetchAt: -Infinity,

  data: undefined,

  error: undefined,

  fetch: fetchOnline,

  getLocal,

  setLocal,

  cleanupLocal,

  init() {
    return this;
  },

  setProperties(properties = {}) {
    runInAction(`Manual set property invoked (${this.name}): ${properties}`, () => {
      Object.assign(this, properties);
    });
  },

  parseData(data, options) {
    return data;
  },

  parseError(error, options) {
    return error;
  },

  onStart(options) {},

  onFinish(data, error, options) {},

  onData(data, options) {},

  onError(error, options) {},

  async onErrorDefault(error, data, options) {
    log.error({ error: { message: `${this.name}: ${error.message}`, code: error.code } });
    runInAction(`onErrorDefault (${this.name})`, () => {
      if (this.error) {
        Object.assign(this.error, error);
      } else {
        this.error = error;
      }
      this.errorUpdatedAt = new Date().getTime();
    });

    if (options.localFirst) {
      await this.setLocal(options.localName || this.name, { body: { error } });
    }

    await this.onError(error, options);

    if (data === undefined && !this.preserveDataOnError) {
      await this.cleanup('data');
    }
  },

  async onDataDefault(data, error, options) {
    runInAction(`onDataDefault (${this.name})`, () => {
      if (this.data) {
        Object.assign(this.data, data);
      } else {
        this.data = data;
      }
      this.dataUpdatedAt = new Date().getTime();
    });

    if (options.localFirst && options.fetchedOnline) {
      await this.setLocal(options.localName || this.name, { body: { data } });
    }

    await this.onData(data, options);

    if (error === undefined) {
      await this.cleanup('error');
    }
  },

  async cleanup(name) {
    runInAction(`cleanup (${this.name})`, async () => {
      if (name === 'all') {
        this.data = undefined;
        this.error = undefined;
        this.loading = undefined;
        this.startedAt = undefined;
        this.finishedAt = undefined;
        let options = this.fetchOptionsDefault;
        if (typeof this.fetchOptions === 'function') {
          options = {
            ...options,
            ...(await this.fetchOptions()),
          };
        } else {
          options = {
            ...options,
            ...this.fetchOptions,
          };
        }
        this.cleanupLocal(
          { ...this.fetchOptionsDefault, ...this.fetchOptions }.localName || this.name,
        );
      } else if (this[name] !== undefined) {
        this[name] = undefined;
      } else {
        log.trace(`Field ${name} for ${this.name} is already undefined`);
      }
    });

    await this.onCleanup(name);
  },

  onCleanup() {},

  async run(passedOptions) {
    return this.startFetching(passedOptions);
  },

  async startFetching(passedOptions = {}) {
    let options = this.fetchOptionsDefault;
    let errorParsed;
    if (typeof this.fetchOptions === 'function') {
      options = {
        ...options,
        ...(await this.fetchOptions(passedOptions)),
        ...passedOptions,
      };
    } else {
      options = {
        ...options,
        ...this.fetchOptions,
        ...passedOptions,
      };
    }

    if (options.body && typeof passedOptions.body !== 'string' && !options.localOnly) {
      try {
        options.body = JSON.stringify(options.body);
      } catch (err) {
        const error = {
          message: `Failed to stringify request body, ${passedOptions.body}`,
          code: '500___000',
        };
        errorParsed = await this.parseError(error, options);
        await this.onErrorDefault(errorParsed, undefined, options);
        return errorParsed;
      }
      if (!options.headers) options.headers = {};
      options.headers['Content-Type'] = 'application/json; charset=utf-8';
    }

    if (options.debounce) {
      clearTimeout(this.debounceTimeout);
      runInAction(`onDebounceStartDefault (${this.name})`, () => {
        this.debouncing = true;
      });
      this.debounceTimeout = setTimeout(async () => {
        runInAction(`onDebounceEndDefault (${this.name})`, () => {
          this.debouncing = false;
        });
        if (this.loading && options.preventRefetch) {
          log.debug(`${this.name} is already loading`);
          return { loading: true };
        }

        runInAction(`onStartDefault (${this.name})`, () => {
          this.loading = true;
          this.startedAt = new Date().getTime();
        });

        await this.onStart(options);
        const result = await this.performFetch(options);
        await this.endFetching(result.dataParsed, result.errorParsed, options);
      }, options.debounce);
      log.debug(`${this.name} is debounced by ${options.debounce}`);
      return { debounced: true };
    }

    if (this.loading && options.preventRefetch) {
      log.debug(`${this.name} is already loading`);
      return { loading: true };
    }

    runInAction(`onStartDefault (${this.name})`, () => {
      this.loading = true;
      this.debouncing = undefined;
      this.startedAt = new Date().getTime();
    });

    await this.onStart(options);

    const result = await this.performFetch(options);
    await this.endFetching(result.dataParsed, result.errorParsed, options);

    return result.response;
  },

  async performFetch(options = {}) {
    let response;
    let fetchedOnline;
    if (options.localOnly) {
      if (options.method === 'POST') {
        response = await this.setLocal(options.localName || this.name, options);
      } else {
        response = await this.getLocal(options.localName || this.name, options);
        if (response === undefined) {
          log.debug(
            `No local value exists for ${this.name} (name ${options.localName ||
              this.name} usedn). Trying to get default value`,
          );
          if (options.defaultValue !== undefined) {
            log.debug(`Returning default value for ${this.name}`);
            response = options.defaultValue;
          } else {
            const error = {
              message: `No local value found and no default value passed ${this.name}`,
              code: '500___000',
            };
            const errorParsed = await this.parseError(error, options);
            await this.onErrorDefault(errorParsed, undefined, options);
            return errorParsed;
          }
        } else {
          log.debug(`Local value will be used for ${this.name}`);
        }
      }
    } else {
      if (options.localFirst) {
        response = await this.getLocal(options.localName || this.name, options);
        if (response === undefined) {
          log.debug(
            `No local value found for ${this.name} (name ${options.localName || this.name} used).`,
          );
        } else if (response.error) {
          log.debug(
            `No local value found for ${this.name} (name ${options.localName ||
              this.name} used). Reason: ${response.error.message}`,
          );
        }
      }
      if (response === undefined || response.error !== undefined) {
        log.debug(`Trying to fetch ${this.name} online`);
        response = await this.fetch(getApiUrl(options.url), options);
        fetchedOnline = true;
      } else {
        log.debug(`${options.url} returned from local storage, online fetch skipped`);
      }
    }

    let dataParsed;
    let errorParsed;
    if (response.data) {
      dataParsed = await this.parseData(response.data, options);
      if (dataParsed.error) {
        errorParsed = await this.parseError(dataParsed.error, options);
        await this.onErrorDefault(errorParsed, undefined, options);
      } else {
        if (response.error) {
          errorParsed = await this.parseError(response.error, options);
        }
        await this.onDataDefault(dataParsed, errorParsed, { fetchedOnline, ...options });
      }
    }

    if (response.error) {
      errorParsed = await this.parseError(response.error, options);
      await this.onErrorDefault(errorParsed, response.data, options);
    }

    if (response.error === undefined && response.data === undefined) {
      await this.cleanup('data');
      await this.cleanup('error');
    }

    return { response, dataParsed, errorParsed };
  },

  async endFetching(dataParsed, errorParsed, options) {
    await this.onFinish(dataParsed, errorParsed, options);

    runInAction(`onFinishDefault (${this.name})`, () => {
      this.loading = false;
      this.finishedAt = new Date().getTime();
    });
  },
};

function createDataFetcher(store) {
  const newStore = Object.defineProperties(
    { ...GenericApiStore },
    Object.getOwnPropertyDescriptors(store),
  );
  decorate(newStore, {
    loading: observable,
    error: observable,
    data: observable,
    onStart: action(`onStart (${newStore.name})`),
    onFinish: action(`onFinish (${newStore.name})`),
    onError: action(`onError (${newStore.name})`),
    onData: action(`onData (${newStore.name})`),
    onCleanup: action(`onCleanup (${newStore.name})`),
  });

  return newStore;
}

export { round, createDataFetcher, getApiUrl };

export default createDataFetcher;
