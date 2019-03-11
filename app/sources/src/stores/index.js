/**
 * Entrypoint of all app stores
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import accounts from './accounts';
import payments from './payments';
import wallets from './wallets';
import vendors from './vendors';
import settings from './settings';
import denominations from './denominations';
import ui from './ui';
import * as dataGeneric from './dataGeneric';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const init = async () => {
  await settings.get.init();
  await accounts.authenticate.run();
  if (accounts.authenticate.error) {
    await accounts.authenticate.cleanup('all');
  }
};

export { accounts, payments, wallets, settings, vendors, denominations, ui, init };

export default {
  accounts,
  payments,
  wallets,
  settings,
  vendors,
  denominations,
  init,
  ui,
  ...dataGeneric,
};
