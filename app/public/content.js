// try {
//   document.styleSheets[0].insertRule(
//     `.bitlum_button {
//      position: relative;
//      display: flex;
//      justify-content: center;
//      align-items: center;
//      font-size: 1em;
//      font-weight: bold;
//      padding: 0.2em 0.5em;
//      background-size: contain;
//      background-repeat: no-repeat;
//      background-color: #51a9e66b;
//      border-radius: 0.2em;
//      color: #60acf1;
//      border: none;
//      cursor: pointer;
//    }`,
//     0,
//   );
//   document.styleSheets[0].insertRule(
//     `
//    .bitlum_button::after {
//      font-weight: normal;
//      position: absolute;
//      content: 'by Bitlum';
//      bottom: -1.5em;
//      left: 0.1em;
//      font-size: 0.5em;
//      color: #000;
//    }`,
//     0,
//   );

//   document.styleSheets[0].insertRule(
//     `
//    .bitlum_button img {
//      height: 1.5em;
//      width: 1.5em;
//      margin-right: 0.5em;
//    }`,
//     0,
//   );
// } catch (e) {
//   console.error(e);
// }

// const newPayButton = payment => {
//   const payButton = document.createElement('button');
//   payButton.className = 'bitlum_button';
//   payButton.setAttribute('data-payment', JSON.stringify(payment));
//   payButton.onclick = e => {
//     window.open(
//       `chrome-extension://${
//         chrome.runtime.id
//       }/index.html#/payments/check?wallet=${e.target.getAttribute('data-payment')}&nopopup=true`,
//       '_blank',
//       'width=450,height=600,titlebar=0,menubar=0,location=0',
//     );
//   };
//   const buttonText = document.createElement('span');
//   buttonText.innerText = 'Pay';

//   const buttonIcon = document.createElement('img');
//   buttonIcon.src = `chrome-extension://${chrome.runtime.id}/assets/icon48.png`;

//   payButton.appendChild(buttonIcon);
//   payButton.appendChild(buttonText);

//   return payButton;
// };

// // Create an observer instance linked to the callback function
// const observer = new MutationObserver((mutationsList, observer) => {
//   const links = [].slice.call(document.querySelectorAll('[href*="lightning:"],[href*="bitcoin:"]'));
//   if (links.length !== 0) {
//     const appendButtonsTo = links.map(link => ({
//       parent: link.parentNode,
//       link: link,
//       payment: {
//         wuid: link.href.replace(/(bitcoin|lightning):/, ''),
//         asset: 'BTC',
//         origin: window.location.origin,
//       },
//     }));
//     appendButtonsTo.forEach(item => {
//       item.parent.appendChild(newPayButton(item.payment));
//     });
//     observer.disconnect();
//   }
// });

// // Start observing the target node for configured mutations
// observer.observe(document.documentElement || document.body, {
//   childList: true,
//   subtree: true,
// });

const linksHandler = e => {
  const link =
    e.target &&
    (e.target.closest('[href^="lightning:"]') || e.target.closest('[href^="bitcoin:"]'));
  if (link) {
    const payment = {
      wuid: link.href.replace(/(bitcoin|lightning):/, ''),
      asset: 'BTC',
      origin: window.location.origin,
    };
    e.preventDefault();
    window.open(
      `chrome-extension://${chrome.runtime.id}/index.html#/payments/check?wallet=${JSON.stringify(
        payment,
      )}&nopopup=true`,
      '_blank',
      'width=450,height=600,titlebar=0,menubar=0,location=0',
    );
  }
};

if (document.addEventListener) {
  document.addEventListener('click', linksHandler);
} else if (document.attachEvent) {
  document.attachEvent('onclick', linksHandler);
}
