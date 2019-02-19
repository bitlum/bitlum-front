/**
 * window.Chrome.notifications wrapper
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';
import GA from 'utils/GA';

import stores from 'stores';

import { configureDevtool } from 'mobx-react-devtools';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Notifications = {
  async create(type, options, title, message, iconUrl, { handlers = {} } = {}) {
    if ([title].some(i => i === undefined)) {
      return { error: { message: 'One of required parameters is missing: type', code: 400 } };
    }
    const notificationData = {
      type: 'basic',
      iconUrl,
      title,
      message,
      contextMessage: 'Bitlum',
    };
    let latestNotification;
    try {
      latestNotification = JSON.parse(localStorage.getItem(`notification_${type}`));
    } catch (e) {}

    if (latestNotification && latestNotification.updatedAt >= options.updatedAt) {
      return { error: { message: 'Too old notification', code: 400 } };
    }

    return new Promise(resolve => {
      window.chrome.notifications.create(notificationData, nId => {
        localStorage.setItem(
          `notification_${type}`,
          JSON.stringify({ ...options, shownAt: new Date().getTime() }),
        );
        window.chrome.notifications.onClicked.addListener(nIdClick => {
          if (nIdClick === nId) {
            if (type === 'newPayment') {
              window.open(
                `chrome-extension://${window.chrome.runtime.id}/index.html#/payments/${
                  options.puid
                }?nopopup=true`,
                '_blank',
                'width=450,height=700,titlebar=0,menubar=0,location=0',
              );
            }
          }
        });
        resolve({ data: { id: nId } });
      });
    }).catch(err => ({ error: { message: err.message, code: 400 } }));
  },
};

window.chrome.webRequest.onCompleted.addListener(
  details => {
    window.chrome.permissions.contains(
      {
        origins: ['http://*/*', 'https://*/*'],
      },
      granted => {
        if (granted) {
          if (details.tabId >= 0) {
            window.chrome.tabs.executeScript(details.tabId, {
              file: 'content.js',
              allFrames: true,
            });
          }
        }
      },
    );
  },
  { urls: ['http://*/*', 'https://*/*'] },
);

const getClipboardData = () => {
  const clipBoardInput = document.createElement('input');
  clipBoardInput.style = 'position: absolute;';
  document.body.appendChild(clipBoardInput);
  clipBoardInput.focus();
  document.execCommand('paste');
  const clipboardValue = clipBoardInput.value;
  document.body.removeChild(clipBoardInput);
  return clipboardValue;
};

(async () => {
  await stores.init();
  const { accounts, payments } = stores;

  const latestPaymentRequests = {};

  window.chrome.runtime.onMessage.addListener(req => {
    if (req.type === 'clipboardEvent') {
      localStorage.setItem(
        'latestCopiedWuid',
        JSON.stringify({ wuid: getClipboardData(), origin: req.origin }),
      );
    }
    if (req.type === 'newPayment') {
      if (new Date() - (latestPaymentRequests[req.payment.wuid] || 0) >= 500) {
        latestPaymentRequests[req.payment.wuid] = new Date().getTime();
        window.open(
          `chrome-extension://${
            window.chrome.runtime.id
          }/index.html#/payments/check?wallet=${JSON.stringify(req.payment)}&nopopup=true`,
          '_blank',
          'width=450,height=700,titlebar=0,menubar=0,location=0',
        );
      }
    }

    if (req.type === 'authenticated') {
      accounts.authenticate.run();
    }

    if (req.type === 'signedOut') {
      accounts.authenticate.cleanup('all');
    }
  });

  const paymentsFetcher = setInterval(async () => {
    if (accounts.authenticate.data) {
      await payments.get.run({ localLifetime: 0 });
      if (payments.get.data) {
        const latestIncoming = payments.get.data.find(payment => payment.direction === 'incoming');
        if (latestIncoming) {
          Notifications.create(
            'newPayment',
            latestIncoming,
            `New ${
              latestIncoming.denominations.main.toString({ omitDirection: true }).total
            } payment from ${latestIncoming.vendorName}!`,
            latestIncoming.description || 'No description',
            latestIncoming.vendorIcon || 'assets/icon48.png',
          );
        }
      }
    }
  }, 3000);
  const accountsFetcher = setInterval(async () => {
    if (accounts.authenticate.data) {
      accounts.get.run({ localLifetime: 0 });
    }
  }, 3000);
})();

window.chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install') {
    log.debug(`Extension install v${chrome.runtime.getManifest().version} recorded`);
    const info = localStorage.getItem('installedV');
    if (info === null || info !== chrome.runtime.getManifest().version) {
      GA({
        type: 'event',
        category: 'extension',
        action: 'install',
        label: chrome.runtime.getManifest().version,
      });
      localStorage.setItem('installedAt', new Date().getTime());
      localStorage.setItem('updatedAt', new Date().getTime());
      localStorage.setItem('installedV', chrome.runtime.getManifest().version);
      localStorage.setItem('updatedV', chrome.runtime.getManifest().version);
    }
  } else if (details.reason === 'update') {
    const info = localStorage.getItem('updatedV');
    if (info === null || info !== chrome.runtime.getManifest().version) {
      GA({
        type: 'event',
        category: 'extension',
        action: 'update',
        label: chrome.runtime.getManifest().version,
      });
      localStorage.setItem('updatedAt', new Date().getTime());
      localStorage.setItem('updatedV', chrome.runtime.getManifest().version);
      log.debug(`Extension update to v${chrome.runtime.getManifest().version} recorded`);
    }
  }
});

if (process.env.NODE_ENV === 'development') {
  // Any configurations are optional
  configureDevtool({
    // Log only changes of type `reaction`
    // (only affects top-level messages in console, not inside groups)
    logFilter: change => change.type === 'action',
  });
}
