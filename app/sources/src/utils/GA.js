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

const trackingId = process.env.NODE_ENV !== 'production' ? 'UA-84668833-16' : 'UA-84668833-18';
const trackingIdSecondary =
  process.env.NODE_ENV !== 'production' ? 'UA-84668833-20' : 'UA-84668833-19';

const analytics = (function GAinitializer() {
  window.ga =
    window.ga ||
    function() {
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
    window.ga('create', trackingIdSecondary, 'auto', 'landing');
    // Remove failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
    window.chrome.cookies.getAll({ url: 'https://bitlum.io' }, cookies => {
      window.ga('set', {
        campaignName: (cookies.find(cookie => cookie.name === 'utm_campaign') || {}).value,
        campaignSource: (cookies.find(cookie => cookie.name === 'utm_source') || {}).value,
        campaignMedium: (cookies.find(cookie => cookie.name === 'utm_medium') || {}).value,
        checkProtocolTask: () => {},
      });
      window.ga('landing.set', {
        campaignName: (cookies.find(cookie => cookie.name === 'utm_campaign') || {}).value,
        campaignSource: (cookies.find(cookie => cookie.name === 'utm_source') || {}).value,
        campaignMedium: (cookies.find(cookie => cookie.name === 'utm_medium') || {}).value,
        checkProtocolTask: () => {},
      });
    });
    // window.ga('set', 'checkProtocolTask', () => {});

    window.ga('require', 'ecommerce');

    log.debug('Google Analytics initialized');

    return ({
      prefix,
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
      const prefixToAdd = prefix ? `${prefix}.` : '';
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
      } else if (type === 'set') {
        window.ga(`${prefixToAdd}set`, category, id);
      } else {
        window.ga(`${prefixToAdd}send`, {
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
            log.debug(
              `GA(${prefixToAdd}): ${type} (${id || ''} ${price || ''} ${revenue ||
                ''} ${category || ''} ${action || ''} ${label || ''} ${page || ''} ${
                title !== '' ? title : page
              }) sent`,
            );
          },
        });
      }
    };
  })();
})();

export default analytics;
