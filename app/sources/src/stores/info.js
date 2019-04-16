/**
 * Entrypoint of info store
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';
import GA from 'utils/GA';

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

info.skipAnnouncement = createDataFetcher({
  name: 'skipAnnouncement',
  fetchOptions: {
    method: 'POST',
    localName: 'skippedAnnouncements',
    localOnly: true,
  },
  async run(anuid) {
    const alreadySkipped = info.getSkippedAnnouncements.data || [];
    await info.getEngagedAnnouncements.run();
    GA({
      type: 'event',
      category: 'announcement',
      action:
        info.getEngagedAnnouncements.data && info.getEngagedAnnouncements.data.includes(anuid)
          ? 'skippedAndEngaged'
          : 'skipped',
      label: anuid,
    });
    return this.startFetching({ body: { data: [...alreadySkipped, anuid] } });
  },
  onData() {
    info.getSkippedAnnouncements.run();
  },
});

info.getSkippedAnnouncements = createDataFetcher({
  name: 'getSkippedAnnouncements',
  fetchOptions: {
    localName: 'skippedAnnouncements',
    localOnly: true,
    defaultValue: { data: [] },
  },
});

info.engageInAnnouncement = createDataFetcher({
  name: 'engageInAnnouncement',
  fetchOptions: {
    method: 'POST',
    localName: 'engagedAnnouncements',
    localOnly: true,
  },
  async run(anuid) {
    const alreadyEngaged = info.getEngagedAnnouncements.data || [];
    GA({
      type: 'event',
      category: 'announcement',
      action: 'engaged',
      label: anuid,
    });
    return this.startFetching({ body: { data: [...alreadyEngaged, anuid] } });
  },
  onData() {
    info.getEngagedAnnouncements.run();
  },
});

info.getEngagedAnnouncements = createDataFetcher({
  name: 'getEngagedAnnouncements',
  fetchOptions: {
    localName: 'engagedAnnouncements',
    localOnly: true,
    defaultValue: { data: [] },
  },
});

export default info;
