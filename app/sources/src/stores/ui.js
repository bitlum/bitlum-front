/**
 * Entrypoint of UI store
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

const ui = {
  getLiveChat: createDataFetcher({
    name: 'GetLiveChat',
    data: { unread: 0 },
    async run() {
      return this.data || { unread: 0 };
    },
  }), 
};

ui.setLiveChat = createDataFetcher({
  name: 'SetLiveChat',
  async run(data) {
    return ui.getLiveChat.onDataDefault(data, undefined, {});
  },
});

export default ui;
