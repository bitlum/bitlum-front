/**
 * Public landing scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';

import GA from 'utils/GA';
import IC from 'utils/IC';

import { Root } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

// eslint-disable-next-line
const Landing = () => {
  // GA({ type: 'pageview', page: '/' });
  return (
    <Root>
     HEY HERE IS PUBLIC LANDING PAGEEEEEEEEE HERE!
    </Root>
  );
};

export default Landing;
