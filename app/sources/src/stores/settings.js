/**
 * Entrypoint of settings store
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';

import { denominations } from 'stores';

import { createDataFetcher, round } from './dataGeneric';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const settings = {
  default: {
    content_script_permissions: undefined,
    denominations_BTC_main: 'USD',
    denominations_BTC_additional: 'SAT',
  },
};

settings.get = createDataFetcher({
  name: 'SettingsGet',
  fetchOptions: {
    localName: 'settings',
    localOnly: true,
    defaultValue: { data: settings.default },
  },
  init() {
    return new Promise(resolve => {
      window.chrome.permissions.contains(
        {
          permissions: ['tabs'],
          origins: ['<all_urls>'],
        },
        async granted => {
          await settings.get.run();
          if (!settings.get.data) {
            await settings.set.run(settings.default);
          } else if (!settings.get.data.content_script_permissions && granted) {
            await settings.set.run({ content_script_permissions: 'granted' });
          }
          resolve();
        },
      );
    });
  },
  parseData(localSettings) {
    return {
      ...settings.default,
      ...localSettings,
    };
  },
  onData() {
    denominations.get.run();
  },
});

settings.set = createDataFetcher({
  name: 'SettingsSet',
  fetchOptions: {
    method: 'POST',
    localName: 'settings',
    localOnly: true,
  },
  async run(newSettings) {
    const currentSettings = settings.get.data || settings.default;
    return this.startFetching({ body: { data: { ...currentSettings, ...newSettings } } });
  },
  onData() {
    settings.get.run();
  },
});

export default settings;
