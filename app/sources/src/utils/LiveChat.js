/**
 * Toolkit for interaction with Intercom API
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import getNet from 'utils/cryptonetChecker';
import logger from 'utils/logging';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const APP_ID = 'ggy8jg8v';
const settings = {
  app_id: APP_ID,
  custom_launcher_selector: '.openIntercom',
};

const intercom = (function ICinitializer() {
  // const w = window;
  // const ic = w.Intercom;
  // if (typeof ic === 'function') {
  //   ic('reattach_activator');
  //   ic('update', settings);
  // } else {
  //   const d = document;
  //   const i = function () {
  //     i.c(arguments); // eslint-disable-line
  //   };
  //   i.q = [];
  //   i.c = function (args) {
  //     i.q.push(args);
  //   };
  //   w.Intercom = i;
  //   const l = () => {
  //     const s = d.createElement('script');
  //     s.type = 'text/javascript';
  //     s.async = true;
  //     s.src = `https://widget.intercom.io/widget/${APP_ID}`;
  //     const x = d.getElementsByTagName('script')[0];
  //     x.parentNode.insertBefore(s, x);
  //   };
  //   if (w.attachEvent) {
  //     w.attachEvent('onload', l);
  //   } else {
  //     w.addEventListener('load', l, false);
  //   }
  // }

  // log.debug('Intercom initialized');

  // return {
  //   Intercom(...args) {
  //     window.Intercom(...args);
  //   },
  //   endSession() {
  //     window.Intercom('shutdown');
  //   },
  //   boot(userSettings) {
  //     window.Intercom('boot', { ...settings, ...userSettings });
  //   },
  //   track(name, metadata) {
  //     window.Intercom('trackEvent', name, metadata);
  //   },
  //   async convertVisitor(type = 'lead') {
  //     log.debug(`IC conversion to ${type} initialized`);
  //     const id = document.cookie.replace(
  //       new RegExp(`(?:(?:^|.*;\\s*)intercom-id-${APP_ID}\\s*\\=\\s*([^;]*).*$)|^.*$`),
  //       '$1',
  //     );
  //     const visitorConversion = await (await fetch('/intercom/visitors/convert', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         visitor: {
  //           user_id: id,
  //         },
  //         user: {
  //           user_id: id,
  //         },
  //         type,
  //       }),
  //     })).json();
  //     if (visitorConversion.errors && type === 'user') {
  //       const userConversion = await (await fetch('/intercom/contacts/convert', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           contact: {
  //             user_id: id,
  //           },
  //           user: {
  //             user_id: id,
  //           },
  //           type,
  //         }),
  //       })).json();
  //       this.boot({ user_id: id });
  //       return userConversion;
  //     }
  //     return visitorConversion;
  //   },
  //   async updateLead(data) {
  //     log.debug('IC lead update initialized', data);
  //     const id = document.cookie.replace(
  //       new RegExp(`(?:(?:^|.*;\\s*)intercom-id-${APP_ID}\\s*\\=\\s*([^;]*).*$)|^.*$`),
  //       '$1',
  //     );
  //     return (await fetch('/intercom/contacts', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         ...data,
  //         user_id: id,
  //       }),
  //     })).json();
  //   },
  //   async createLead(data) {
  //     log.debug('IC lead creation initialized', data);
  //     return (await fetch('/intercom/contacts', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         ...data,
  //       }),
  //     })).json();
  //   },
  // };
}());

export default intercom;
