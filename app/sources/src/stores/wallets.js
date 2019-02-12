/**
 * Entrypoint of all wallets store
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';

import { accounts } from 'stores';

import { createDataFetcher } from './dataGeneric';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const wallets = {
  getDetails: createDataFetcher({
    name: 'WalletsGetDetails',
    async fetchOptions({ wuid, asset } = {}) {
      return {
        url: `/wallets/details?asset=${asset}&wuid=${wuid}`,
        wuid,
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
      };
    },
    async run(wuid, asset) {
      return this.startFetching({
        asset,
        wuid,
        headers: {
          Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
        },
      });
    },
  }),
};

export default wallets;
