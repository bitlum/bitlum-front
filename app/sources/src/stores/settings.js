/**
 * Entrypoint of settings store
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';

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
  parseData(localSettings) {
    return {
      ...settings.default,
      ...localSettings,
    };
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
