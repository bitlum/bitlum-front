/**
 * Entrypoint of all app stores
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import { decorate, action, observable } from 'mobx';

import log from 'utils/logging';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const ui = observable(
  {
    isAsideShown: false,
    toggleAside(value) {
      if (value !== undefined) {
        this.isAsideShown = value;
      } else {
        this.isAsideShown = !this.isAsideShown;
      }
    },
  },
  {
    toggleAside: action('Toggle aside (uiStore)'),
  },
);

export default { ui };
