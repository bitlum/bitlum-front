/**
 * Chrome.notifications wrapper
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

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
      chrome.notifications.create(notificationData, nId => {
        localStorage.setItem(
          `notification_${type}`,
          JSON.stringify({ ...options, shownAt: new Date().getTime() }),
        );
        chrome.notifications.onClicked.addListener(nIdClick => {
          if (nIdClick === nId) {
            if (type === 'newPayment') {
              window.open(
                `chrome-extension://${chrome.runtime.id}/index.html#/payments/${
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

const getApiUrl = strings => {
  const urlsWithoutApi = strings.map(string => string.replace(/^\/api/, ''));
  if (chrome.runtime.id === 'icngeifjnagecadcpionphekcdaapnki') {
    return `http://lvh.me:3004${urlsWithoutApi}`;
  }
  return `https://api.bitlum.io${urlsWithoutApi}`;
};

const vendorShark = 'assets/icons/vendors/shark.svg';
const vendorBear = 'assets/icons/vendors/bear.svg';
const vendorBird = 'assets/icons/vendors/bird.svg';
const vendorDog = 'assets/icons/vendors/dog.svg';
const vendorCat = 'assets/icons/vendors/cat.svg';
const vendorLion = 'assets/icons/vendors/lion.svg';
const vendorFrog = 'assets/icons/vendors/frog.svg';
const vendorChicken = 'assets/icons/vendors/chicken.svg';
const vendorElephant = 'assets/icons/vendors/elephant.svg';
const vendorFish = 'assets/icons/vendors/fish.svg';
const vendorGorilla = 'assets/icons/vendors/gorilla.svg';
const vendorHorse = 'assets/icons/vendors/horse.svg';
const vendorPenguin = 'assets/icons/vendors/penguin.svg';
const vendorSquirrel = 'assets/icons/vendors/squirrel.svg';

const vendors = {
  randomVendors: (() =>
    [].concat(
      ...[
        { name: 'Shark', iconUrl: vendorShark },
        { name: 'Bear', iconUrl: vendorBear },
        { name: 'Bird', iconUrl: vendorBird },
        { name: 'Dog', iconUrl: vendorDog },
        { name: 'Cat', iconUrl: vendorCat },
        { name: 'Lion', iconUrl: vendorLion },
        { name: 'Frog', iconUrl: vendorFrog },
        { name: 'Chicken', iconUrl: vendorChicken },
        { name: 'Elephant', iconUrl: vendorElephant },
        { name: 'Fish', iconUrl: vendorFish },
        { name: 'Gorilla', iconUrl: vendorGorilla },
        { name: 'Horse', iconUrl: vendorHorse },
        { name: 'Penguin', iconUrl: vendorPenguin },
        { name: 'Squirrel', iconUrl: vendorSquirrel },
      ].map(character =>
        [
          { color: '#F44336', name: 'Red' },
          { color: '#E91E63', name: 'Pink' },
          { color: '#9C27B0', name: 'Purple' },
          { color: '#673AB7', name: 'Violet' },
          { color: '#3F51B5', name: 'Indigo' },
          { color: '#2196F3', name: 'Blue' },
          { color: '#03A9F4', name: 'Sky' },
          { color: '#00BCD4', name: 'Cyan' },
          { color: '#009688', name: 'Teal' },
          { color: '#4CAF50', name: 'Green' },
          { color: '#8BC34A', name: 'Grass' },
          { color: '#CDDC39', name: 'Lime' },
          { color: '#FFEB3B', name: 'Yellow' },
          { color: '#FFC107', name: 'Amber' },
          { color: '#FF9800', name: 'Orange' },
          { color: '#795548', name: 'Brown' },
          { color: '#9E9E9E', name: 'Grey' },
          { color: '#607D8B', name: 'Livid' },
        ].map(color => ({
          ...character,
          ...color,
          name: `${color.name} ${character.name}`,
        })),
      ),
    ))(),
  generateUnique(usedNames) {
    const unusedVendors = this.randomVendors.filter(vendor => !usedNames.includes(vendor.name));
    return unusedVendors[Math.floor(Math.random() * unusedVendors.length)];
  },
  getRandom(vuid) {
    let savedRandom;
    try {
      savedRandom = JSON.parse(localStorage.getItem('randomizedVendors')) || {};
    } catch (e) {
      savedRandom = {};
      log.error(e);
    }
    const usedNames = Object.keys(savedRandom).map(vuidSaved => savedRandom[vuidSaved].name);
    if (savedRandom[vuid]) {
      return [savedRandom[vuid]];
    }
    const generated = this.generateUnique(usedNames);
    localStorage.setItem(
      'randomizedVendors',
      JSON.stringify({ [vuid]: generated, ...savedRandom }),
    );
    return [generated];
  },
};

const paymentsFetcher = setInterval(async () => {
  let authData;
  // let accountData;
  try {
    authData = JSON.parse(localStorage.getItem('authData'));
    // accountData = JSON.parse(localStorage.getItem('accountData'));
  } catch (e) {
    console.log(e);
  }
  if (authData) {
    const result = await this.fetch(getApiUrl`/api/payments`, {
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    }).then(res => res.json());

    if (result.data) {
      const latestIncoming = result.data.find(payment => payment.direction === 'incoming');
      if (latestIncoming) {
        let vendor;
        if (latestIncoming.vendorName) {
          vendor = {
            name: latestIncoming.vendorName,
            iconUrl: latestIncoming.vendorIcon,
          };
        } else {
          vendor = vendors.getRandom(latestIncoming.vuid)[0];
        }
        Notifications.create(
          'newPayment',
          latestIncoming,
          `Payment ${latestIncoming.status === 'completed' ? 'received' : 'pending'} from ${
            vendor.name
          }`,
          latestIncoming.description || 'No description',
          'assets/icon48.png',
        );
      }
    }
  }
}, 5000);

chrome.webRequest.onCompleted.addListener(
  details => {
    chrome.permissions.contains(
      {
        origins: ['http://*/*', 'https://*/*'],
      },
      granted => {
        if (granted) {
          if (details.tabId >= 0) {
            chrome.tabs.executeScript(details.tabId, { file: 'content.js', allFrames: true });
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
chrome.runtime.onMessage.addListener(req => {
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
        `chrome-extension://${chrome.runtime.id}/index.html#/payments/check?wallet=${JSON.stringify(
          req.payment,
        )}&nopopup=true`,
        '_blank',
        'width=450,height=700,titlebar=0,menubar=0,location=0',
      );
    }
  }
});
