(() => {
  if (window[`walletIntegrated_${chrome.runtime.id}`]) {
    return;
  }
  window[`walletIntegrated_${chrome.runtime.id}`] = true;
  const wuidParsers = {
    'www.bitrefill.com': ({ type, target }) => {
      switch (type) {
        case 'mousedown': {
          if (
            document.querySelectorAll('img[src^="data:image/png;base64"]').length === 1 &&
            !document.querySelector(
              '[href="https://www.bitrefill.com/faq/#my-topup-did-not-arrive"]',
            ) &&
            target ===
              document
                .querySelector('[data-section]')
                .parentElement.lastChild.querySelector('button')
          ) {
            target.outerHTML = target.outerHTML;
            window.mousedownTriggered = true;
          }
          return undefined;
        }
        case 'mouseup': {
          if (
            target ===
              document
                .querySelector('[data-section]')
                .parentElement.lastChild.querySelector('button') &&
            window.mousedownTriggered
          ) {
            const wuid = document
              .querySelector('[href^="LIGHTNING:"]')
              .href.replace(/(lightning|LIGHTNING):/, '')
              .toLowerCase();
            window.mousedownTriggered = false;
            return wuid;
          }
          return undefined;
        }
        case 'click': {
          return wuidParsers.default({ type, target });
        }
        default:
          return undefined;
      }
    },
    default({ type, target }) {
      switch (type) {
        case 'click': {
          const node =
            target &&
            (target.closest('[href^="lightning:"]') ||
              target.closest('[href^="bitcoin:"]') ||
              target.closest('[href^="LIGHTNING:"]') ||
              target.closest('[href^="BITCOIN:"]'));

          if (!node) {
            return undefined;
          }

          const wuidType = node.href.match(/^(.*):/)[1].toLowerCase();
          const wuid = node.href.replace(/(bitcoin|lightning|LIGHTNING|BITCOIN):/, '');

          if (wuidType === 'lightning') {
            return wuid.toLowerCase();
          }

          return wuid;
        }
        default:
          return undefined;
      }
    },
  };

  const handleWuid = wuid => {
    const payment = {
      wuid,
      asset: 'BTC',
      origin: window.location.hostname,
    };
    window.open(
      `chrome-extension://${chrome.runtime.id}/index.html#/payments/check?wallet=${JSON.stringify(
        payment,
      )}&nopopup=true`,
      '_blank',
      'width=450,height=700,titlebar=0,menubar=0,location=0',
    );
  };

  const clickListener = e => {
    const wuid = (wuidParsers[window.location.hostname] || wuidParsers.default)(e);
    if (wuid) {
      e.preventDefault();
      handleWuid(wuid);
    }
  };

  document.addEventListener('mousedown', clickListener);
  document.addEventListener('click', clickListener);
  document.addEventListener('mouseup', clickListener);

  const clipboardListener = e => {
    const origin = window.location.hostname;
    chrome.runtime.sendMessage({ type: 'clipboardEvent',origin });
  };
  document.addEventListener('copy', clipboardListener);
  document.addEventListener('cut', clipboardListener);
})();
