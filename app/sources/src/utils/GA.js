/**
 * Toolkit for interaction with Google Analytics API
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';
const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const trackingId =
  process.env.NODE_ENV !== 'production'
    ? 'UA-84668833-16'
      : 'UA-84668833-18';

const analytics = (function GAinitializer() {
  window.ga =
    window.ga ||
    function () {
      (window.ga.q = window.ga.q || []).push(arguments); // eslint-disable-line
    };
  window.ga.l = +new Date();

  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = 'https://www.google-analytics.com/analytics.js';
  const x = document.getElementsByTagName('script')[0];
  x.parentNode.insertBefore(s, x);

  return (function GALoggerWrapper() {
    window.ga('create', trackingId);
    // Remove failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
    window.ga('set', 'checkProtocolTask', () => {});

    window.ga('require', 'ecommerce');

    log.debug('Google Analytics initialized');

    return ({
      type = 'event',
      category = '',
      action = '',
      label = '',
      page = '',
      title = '',
      id,
      name,
      price,
      revenue,
      quantity,
    }) => {
      if (type === 'item') {
        window.ga('ecommerce:addItem', {
          id,
          name,
          price,
          quantity,
        });
        window.ga('ecommerce:addTransaction', {
          id,
          revenue,
        });
        window.ga('ecommerce:send');
      } else {
        window.ga('send', {
          hitType: type,
          eventCategory: category,
          eventAction: action,
          eventLabel: label,
          id,
          name,
          price,
          quantity,
          revenue,
          title: title !== '' ? title : page,
          page,
          hitCallback() {
            log.debug(`GA: ${type} (${id || ''} ${price || ''} ${revenue || ''} ${category ||
                ''} ${action || ''} ${label || ''} ${page || ''} ${
              title !== '' ? title : page
            }) sent`);
          },
        });
      }
    };
  }());
}());

export default analytics;
