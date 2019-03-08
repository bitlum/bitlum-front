(() => {
  if (window[`walletIntegrated_${chrome.runtime.id}`]) {
    return;
  }

  window[`walletIntegrated_${chrome.runtime.id}`] = true;

  const vendorHandlers = {
    default: {
      handleWuid(wuid, amount) {
        const payment = {
          wuid,
          asset: 'BTC',
          origin: window.location.hostname,
          amount,
        };
        chrome.runtime.sendMessage({ type: 'newPayment', payment });
      },
      events: {
        click: {
          handle(e) {
            const { target } = e;
            const node =
              target &&
              (target.closest('[href^="lightning:"]') ||
                target.closest('[href^="bitcoin:"]') ||
                target.closest('[href^="LIGHTNING:"]') ||
                target.closest('[href^="BITCOIN:"]'));

            if (node) {
              const wuidType = node.href.match(/^(.*):/)[1].toLowerCase();
              const wuid = node.href.replace(/(bitcoin|lightning|LIGHTNING|BITCOIN):/, '');

              e.preventDefault();
              if (wuidType === 'lightning') {
                vendorHandlers.default.handleWuid(wuid.toLowerCase());
              }

              vendorHandlers.default.handleWuid(wuid);
            }
          },
        },
      },
    },
  };

  vendorHandlers['www.bitrefill.com'] = {
    handleWuid: vendorHandlers.default.handleWuid,
    events: {
      mousedown: {
        handle(e) {
          const { target } = e;
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
        },
      },
      mouseup: {
        handle(e) {
          const { target } = e;
          if (
            target ===
              document
                .querySelector('[data-section]')
                .parentElement.lastChild.querySelector('button') &&
            window.mousedownTriggered
          ) {
            window.mousedownTriggered = false;

            const node =
              document.querySelector('[href^="LIGHTNING:"]') ||
              document.querySelector('[href^="lightning:"]') ||
              document.querySelector('[href^="BITCOIN:"]') ||
              document.querySelector('[href^="bitcoin:"]');

            const wuidType = node.href.match(/^(.*):/)[1].toLowerCase();
            let wuid = node.href.replace(/(bitcoin|lightning|LIGHTNING|BITCOIN):/, '');

            let amount;
            if (wuidType === 'bitcoin' && node.href.match(/\?amount=(.*)/)) {
              amount = node.href.match(/\?amount=(.*)/)[1];
              wuid = wuid.replace(/\?amount=.*$/, '');
            }
            vendorHandlers.default.handleWuid(wuid, amount);
          }
        },
      },
      click: {
        handle(e) {
          const { target } = e;
          const node =
            target &&
            (target.closest('[href^="lightning:"]') ||
              target.closest('[href^="bitcoin:"]') ||
              target.closest('[href^="LIGHTNING:"]') ||
              target.closest('[href^="BITCOIN:"]'));

          if (node) {
            const wuidType = node.href.match(/^(.*):/)[1].toLowerCase();
            let wuid = node.href.replace(/(bitcoin|lightning|LIGHTNING|BITCOIN):/, '');

            e.preventDefault();
            let amount;
            if (wuidType === 'bitcoin' && node.href.match(/\?amount=(.*)/)) {
              amount = node.href.match(/\?amount=(.*)/)[1].toLowerCase();
              wuid = wuid.replace(/\?amount=.*$/, '');
            }

            vendorHandlers.default.handleWuid(wuid, amount);
          }
        },
      },
    },
  };

  vendorHandlers['tippin.me'] = {
    handleWuid: vendorHandlers.default.handleWuid,
    events: {
      mousedown: {
        handle(e) {
          const { target } = e;
          const node =
            target &&
            target.parentElement.parentElement &&
            Array.from(target.parentElement.parentElement.childNodes).find(
              child => child.href && child.href.includes('lightning:'),
            );
          const handlerToDisable = document.querySelector('#qrcode-darker');
          if (handlerToDisable) {
            const clone = handlerToDisable.cloneNode(true);
            clone.removeAttribute('onclick');
            handlerToDisable.parentNode.replaceChild(clone, handlerToDisable);
          }
          if (node) {
            const wuid = node.href.replace(/(lightning):/, '');
            e.preventDefault();
            vendorHandlers.default.handleWuid(wuid);
          }
        },
      },
    },
  };

  vendorHandlers['www.twitch.tv'] = {
    handleWuid: vendorHandlers.default.handleWuid,
    events: {
      domObserver: {
        locationFilter(location) {
          return location.pathname === '/donnerlab';
        },
        // targetQuery: '[data-a-target^="whisper-thread-donnerlab"] .simplebar-content > div',
        targetQuery: '.whispers-open-threads',
        config: { childList: true, subtree: true },
        handle(mutationsList) {
          mutationsList.forEach(mutation => {
            if (
              mutation.type == 'childList' &&
              mutation.addedNodes &&
              mutation.addedNodes[0] &&
              mutation.addedNodes[0].querySelector
            ) {
              window.latestWhisper = mutation.addedNodes[0];
              clearTimeout(window.lastWhisperChecker);
              window.lastWhisperChecker = setTimeout(() => {
                const wuidNodes = window.latestWhisper.querySelectorAll('.text-fragment');
                const latestMessages = document.querySelectorAll(
                  '[data-a-target^="whisper-thread-donnerlab"] .simplebar-content .thread-message__message .text-fragment',
                );
                const wuidLatestNode =
                  latestMessages.length > 0 && latestMessages[latestMessages.length - 1];
                const wuidFromMesageNode = wuidNodes.length > 0 && wuidNodes[wuidNodes.length - 1];

                const isDonnerlabMessage =
                  window.latestWhisper.querySelector('[data-a-target="whisper-message-name"]') &&
                  window.latestWhisper.querySelector('[data-a-target="whisper-message-name"]')
                    .innerText === 'donnerlab';
                if (
                  isDonnerlabMessage &&
                  wuidLatestNode &&
                  wuidFromMesageNode &&
                  window.latestWuid !== wuidLatestNode.innerText
                ) {
                  window.latestWuid = wuidLatestNode.innerText;
                  vendorHandlers.default.handleWuid(wuidLatestNode.innerText);
                }
              }, 100);
            }
          });
        },
      },
    },
  };

  const listenToEvent = (type, options) => {
    if (['click', 'mouseup', 'mousedown', 'copy', 'cut'].includes(type)) {
      document.body.addEventListener(type, options.handle);
    } else if (['domObserver'].includes(type)) {
      if (!document.querySelector(options.targetQuery)) {
        new MutationObserver((mutationsList, observer) => {
          if (document.querySelector(options.targetQuery)) {
            new MutationObserver(options.handle).observe(
              document.querySelector(options.targetQuery),
              options.config,
            );
            observer.disconnect();
          }
        }).observe(document.body, { childList: true });
      } else {
        new MutationObserver(options.handle).observe(
          document.querySelector(options.targetQuery),
          options.config,
        );
      }
    } else if (['injected'].includes(type)) {
      options.handle();
    } else {
      console.error(`Unknow event type "${type}"`);
    }
  };

  const handler = vendorHandlers[window.location.hostname] || vendorHandlers.default;
  if (handler.events) {
    Object.keys(handler.events).forEach(eventType => {
      if (
        handler.events[eventType].locationFilter === undefined ||
        (typeof handler.events[eventType].locationFilter === 'function' &&
          handler.events[eventType].locationFilter(window.location))
      ) {
        listenToEvent(eventType, handler.events[eventType]);
      }
    });
  }

  const clipboardListener = () => {
    const origin = window.location.hostname;
    chrome.runtime.sendMessage({ type: 'clipboardEvent', origin });
  };
  document.addEventListener('copy', clipboardListener);
  document.addEventListener('cut', clipboardListener);
})();
