/**
 * window.Chrome.notifications wrapper
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';
import GA from 'utils/GA';
import LiveChat from 'utils/LiveChat';

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

const setUninstallUrl = account => {
  window.chrome.cookies.getAll({ url: 'https://bitlum.io' }, cookies => {
    const utmParams = {
      utm_campaign: (cookies.find(cookie => cookie.name === 'utm_campaign') || {}).value,
      utm_source: (cookies.find(cookie => cookie.name === 'utm_source') || {}).value,
      utm_medium: (cookies.find(cookie => cookie.name === 'utm_medium') || {}).value,
    };
    window.chrome.runtime.setUninstallURL(
      `https://bitlum.io/uninstalled?${account ? `email=${account.email}` : ''}&${Object.entries(
        utmParams,
      )
        .map(value => (value[1] !== undefined ? `${value[0]}=${value[1]}` : false))
        .filter(i => i)
        .join('&')}`,
    );
  });
};

const openConfirmationWindow = payment => {
  window.open(
    `chrome-extension://${
      window.chrome.runtime.id
    }/index.html#/payments/check?wallet=${payment}&nopopup=true`,
    '_blank',
    'width=450,height=700,titlebar=0,menubar=0,location=0',
  );
};

const openReceiveWindow = payment => {
  window.open(
    `chrome-extension://${
      window.chrome.runtime.id
    }/index.html#/payments/receive/confirm?receive=${payment}&nopopup=true`,
    '_blank',
    'width=450,height=700,titlebar=0,menubar=0,location=0',
  );
};

(async () => {
  await stores.init();
  const { accounts, payments, ui, info, wallets } = stores;

  const latestPaymentRequests = {};
  const latestClipboardChange = {};
  const withdrawalRequest = {};

  setUninstallUrl(accounts.get.data);

  if (process.env.NODE_ENV === 'production') {
    LiveChat.boot({
      user_id: accounts.get.data && accounts.get.data.auid,
    });
  }

  window.chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.type === 'clipboardEvent') {
      if (req.action === 'copy') {
        localStorage.setItem(
          'latestCopiedWuid',
          JSON.stringify({ wuid: getClipboardData(), origin: req.origin }),
        );
      }
    }
    if (req.type === 'newPayment') {
      if (new Date() - (latestPaymentRequests[req.payment.wuid] || 0) >= 500) {
        latestPaymentRequests[req.payment.wuid] = new Date().getTime();
        openConfirmationWindow(JSON.stringify(req.payment));
      }
    }

    if (req.type === 'authenticated') {
      accounts.authenticate.run().then(r => {
        LiveChat.boot({
          user_id: accounts.get.data && accounts.get.data.auid,
        });
        setUninstallUrl(accounts.get.data);
      });
    }

    if (req.type === 'signedOut') {
      accounts.authenticate.cleanup('all');
    }

    if (req.type === 'weblnRequest') {
      GA({
        type: 'event',
        category: 'extension',
        action: 'weblnRequest',
        label: req.method,
      });
      if (req.method === 'makeInvoice') {
        const amount = req.options
          ? (req.options.amount || req.options.defaultAmount) / 10 ** 8
          : undefined;
        // Return invoice with maximum amount by default
        // instead of open withdraw confirmation window
        // payments.receive
        //   .run(
        //     'lightning',
        //     req.options ? (req.options.amount || req.options.defaultAmount) / 10 ** 8 : 0,
        //     'BTC',
        //   )
        //   .then(response => {
        //     if (response.data) {
        //       sendResponse({ paymentRequest: response.data.wuid });
        //     } else {
        //       sendResponse({ response });
        //     }
        //   });
        openReceiveWindow(
          JSON.stringify({
            amount,
            type: 'lightning',
            asset: 'BTC',
            origin: req.origin,
          }),
        );
        withdrawalRequest[`${req.origin}_${amount}`] = response => {
          if (response.data) {
            sendResponse({ paymentRequest: response.data.wuid });
          } else {
            sendResponse({ response });
          }
        };
        return true;
      }
      if (req.method === 'sendPayment') {
        openConfirmationWindow(
          JSON.stringify({ wuid: req.options, asset: 'BTC', origin: req.origin }),
        );
      }
    }

    if (req.type === 'wuidGenerated') {
      withdrawalRequest[`${req.initialRequest.origin}_${req.initialRequest.amount}`](req);
      GA({
        type: 'event',
        category: 'extension',
        action: 'weblnInvoicePassed',
        label: req.initialRequest.origin,
      });
    }
  });
  const paymentsFetcher = setInterval(async () => {
    if (accounts.authenticate.data) {
      await payments.get.run({ localLifetime: 0 });
      if (payments.get.data) {
        const incoming = payments.get.data.filter(payment => payment.direction === 'incoming');
        const outgoing = payments.get.data.filter(payment => payment.direction === 'outgoing');
        const latestIncoming = incoming[0];
        const latestOutgoing = outgoing[0];
        const firstPaymentMadeAt = localStorage.getItem('firstPaymentMadeAt');
        const firstDepositMadeAt = localStorage.getItem('firstDepositMadeAt');

        if (
          firstPaymentMadeAt === null &&
          outgoing.length <= 3 &&
          latestOutgoing &&
          latestOutgoing.createdAt >= new Date('02.28.2019')
        ) {
          localStorage.setItem('firstPaymentMadeAt', new Date().getTime());
          GA({
            prefix: 'landing',
            type: 'event',
            category: 'extension',
            action: 'firstPaymentMade',
          });
        }

        if (
          firstDepositMadeAt === null &&
          incoming.length <= 3 &&
          latestIncoming &&
          latestIncoming.createdAt >= new Date('02.28.2019') &&
          latestIncoming.vuid !== 'bitlum'
        ) {
          localStorage.setItem('firstDepositMadeAt', new Date().getTime());
          GA({
            prefix: 'landing',
            type: 'event',
            category: 'extension',
            action: 'firstDepositMade',
          });
        }

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

  const infoFetcher = setInterval(async () => {
    info.get.run({ localLifetime: 0 });
  }, 3000);

  const chatUnreadChecker = setInterval(async () => {
    await ui.getLiveChat.run();
    if (ui.getLiveChat.data.unread >= 1) {
      window.chrome.browserAction.setBadgeText({ text: `${ui.getLiveChat.data.unread}` });
      window.chrome.browserAction.setBadgeBackgroundColor({ color: '#f00' });
    } else {
      window.chrome.browserAction.setBadgeText({ text: '' });
    }
  }, 3000);

  // const clipboardChecker = setInterval(async () => {
  //   const wuid = getClipboardData();
  //   if (new Date() - latestClipboardChange.changedAt >= 1000 ||wuid !== latestClipboardChange.value) {
  //     latestClipboardChange.changedAt = new Date();
  //     await wallets.getDetails.run(
  //       wuid.replace(/(bitcoin|lightning|LIGHTNING|BITCOIN):/, ''),
  //       'BTC',
  //     );

  //     if (!wallets.getDetails.error) {
  //       openConfirmationWindow(
  //         JSON.stringify({
  //           wuid,
  //           asset: 'BTC',
  //         }),
  //       );
  //     }
  //   }
  //   latestClipboardChange.value = wuid;
  // }, 400);

  if (process.env.NODE_ENV === 'development') {
    // Any configurations are optional
    window.stores = stores;
  }
})();

window.chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install') {
    log.debug(`Extension install v${window.chrome.runtime.getManifest().version} recorded`);
    const info = localStorage.getItem('installedV');
    if (info === null || info !== window.chrome.runtime.getManifest().version) {
      GA({
        prefix: 'landing',
        type: 'event',
        category: 'extension',
        action: 'install',
        label: window.chrome.runtime.getManifest().version,
      });
      localStorage.setItem('installedAt', new Date().getTime());
      localStorage.setItem('updatedAt', new Date().getTime());
      localStorage.setItem('installedV', window.chrome.runtime.getManifest().version);
      localStorage.setItem('updatedV', window.chrome.runtime.getManifest().version);
    }
  } else if (details.reason === 'update') {
    const info = localStorage.getItem('updatedV');
    if (info === null || info !== window.chrome.runtime.getManifest().version) {
      localStorage.setItem('updatedAt', new Date().getTime());
      localStorage.setItem('updatedV', window.chrome.runtime.getManifest().version);
      log.debug(`Extension update to v${window.chrome.runtime.getManifest().version} recorded`);
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
