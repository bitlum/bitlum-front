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
      `chrome-extension://${chrome.runtime.id}/index.html?payment=${e.target.getAttribute(
        'data-payment',
      )}#/send`,
      'Bitlum - payment confirmation',
      'width=450,height=600,top=0,titlebar=0,menubar=0,location=0',
    );
    console.log(JSON.parse(e.target.getAttribute('data-payment')));
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
        payment: { invoice: lightningLinks[0].href.replace('lightning:', '') },
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
