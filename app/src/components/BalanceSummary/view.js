/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import log from 'utils/logging';

import { Root, Main, Additional, Receive, Send } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const BalanceSummary = ({
  accounts,
  mainDenominationSign,
  mainDenominationRound,
  mainDenominationPrice,
  additionalDenominationSign,
  additionalDenominationRound,
  additionalDenominationPrice,
  className,
  t,
}) => {
  if (accounts.get.error || !accounts.get.data) {
    return <Root className={className}>Error loading account data</Root>;
  }
  return (
    <Root className={className} loading={accounts.get.loading}>
      <Receive to="/receive">Receive</Receive>
      BALANCE
      {Object.keys(accounts.get.data.balances).map(asset => [
        <Main key={`${asset}Main`}>
          {Math.floor(
            accounts.get.data.balances[asset].available *
              mainDenominationPrice *
              10 ** mainDenominationRound,
          ) /
            10 ** mainDenominationRound}{' '}
          {mainDenominationSign}
        </Main>,
        <Additional key={`${asset}Additional`}>
          {Math.floor(
            accounts.get.data.balances[asset].available *
              additionalDenominationPrice *
              10 ** additionalDenominationRound,
          ) /
            10 ** additionalDenominationRound}{' '}
          {additionalDenominationSign}
        </Additional>,
      ])}
      <Send to="/send">Pay</Send>
    </Root>
  );
};

BalanceSummary.propTypes = {};

BalanceSummary.defaultProps = {};

export default BalanceSummary;
