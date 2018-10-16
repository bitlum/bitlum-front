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
import { MemoryRouter as Router, Route, NavLink } from 'react-router-dom';

import GA from 'utils/GA';
import IC from 'utils/IC';
import getNet from 'utils/cryptonetChecker';

import PaymentItem from 'components/PaymentItem';
import SendPayment from 'components/SendPayment';
import ReceivePayment from 'components/ReceivePayment';
import AuthenticationWidget from 'components/AuthenticationWidget';
import AccountInfo from 'components/AccountInfo';

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
