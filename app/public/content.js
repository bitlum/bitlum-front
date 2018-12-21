const newPayButton = payment => {
  const payButton = document.createElement('button');
  payButton.innerText = 'Pay with Bitlum';
  payButton.styles = `
  font-size: 1em;
  padding: 0.5em;
  background-color: blue;
  font-color: #fff;
  border-radius: 1em;
`;
  payButton.setAttribute('data-payment', JSON.stringify(payment));
  payButton.onclick = e => {
    window.open(
      `chrome-extension://${
        chrome.runtime.id
      }/index.html#/payments/check?wallet=${e.target.getAttribute('data-payment')}&nopopup=true`,
      'Bitlum - payment confirmation',
      'width=450,height=600,top=0,titlebar=0,menubar=0,location=0',
    );
  };
  return payButton;
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver((mutationsList, observer) => {
  const lightningLinks = [].slice.call(document.querySelectorAll('[href*="lightning:"]'));
  if (lightningLinks.length !== 0) {
    const appendButtonsTo = [
      {
        node: lightningLinks[0].parentNode,
        payment: {
          wuid: lightningLinks[0].href.replace('lightning:', ''),
          asset: 'BTC',
          origin: window.location.origin,
        },
      },
    ];
    appendButtonsTo.forEach(item => {
      item.node.appendChild(newPayButton(item.payment));
    });
    observer.disconnect();
  }
});

// Start observing the target node for configured mutations
observer.observe(document.documentElement || document.body, {
  childList: true,
  subtree: true,
});
