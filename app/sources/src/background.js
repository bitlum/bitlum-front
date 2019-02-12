/**
 * window.Chrome.notifications wrapper
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';
const log = logger();

import { vendors, accounts, getApiUrl } from 'stores';

import { configureDevtool } from 'mobx-react-devtools';

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

window.accounts = accounts;


accounts.get.run();


// const paymentsFetcher = setInterval(async () => {
//   let authData;
//   // let accountData;
//   try {
//     authData = JSON.parse(localStorage.getItem('authData'));
//     // accountData = JSON.parse(localStorage.getItem('accountData'));
//   } catch (e) {
//     console.log(e);
//   }
//   if (authData) {
//     const result = await fetch(getApiUrl`/payments`, {
//       headers: {
//         Authorization: `Bearer ${authData.token}`,
//       },
//     }).then(res => res.json());

//     if (result.data) {
//       const latestIncoming = result.data.find(payment => payment.direction === 'incoming');
//       if (latestIncoming) {
//         let vendor;
//         if (latestIncoming.vendorName) {
//           vendor = {
//             name: latestIncoming.vendorName,
//             iconUrl: latestIncoming.vendorIcon,
//           };
//         } else {
//           vendor = vendors.getRandom(latestIncoming.vuid)[0];
//         }
//         console.log(vendor.iconUrl);
//         Notifications.create(
//           'newPayment',
//           latestIncoming,
//           `Payment ${latestIncoming.status === 'completed' ? 'received' : 'pending'} from ${
//             vendor.name
//           }`,
//           latestIncoming.description || 'No description',
//           vendor.iconUrl || 'assets/icon48.png',
//         );
//       }
//     }
//   }
// }, 5000);

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

// let previousClipboardWuid;
// const clipboardChecker = setInterval(() => {
//   const currentClipboard = getClipboardData();

// }, 1000);
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
});
if (process.env.NODE_ENV === 'development') {
  // Any configurations are optional
  configureDevtool({
    // Turn on logging changes button programmatically:
    logEnabled: true,
    // Log only changes of type `reaction`
    // (only affects top-level messages in console, not inside groups)
    logFilter: change => change.type === 'action',
  });
}
