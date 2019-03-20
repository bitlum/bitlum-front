/**
 * Entrypoint of info store
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';

import { createDataFetcher } from './dataGeneric';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const info = {
  get: createDataFetcher({
    name: 'InfoGet',
    fetchOptions: {
      url: '/info',
      localFirst: true,
    },
  }),
};

export default info;
