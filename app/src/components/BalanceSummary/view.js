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

export const BalanceSummary = ({ accounts, className, t }) => {
  if (accounts.get.error || !accounts.get.data) {
    return <Root className={className}>Error loading account data</Root>;
  }
  const totalBalance = Object.keys(accounts.get.data.balances)
    .map(asset => accounts.get.data.balances[asset].available)
    .reduce((p, c) => p + Number(c), 0);

  return (
    <Root className={className} loading={accounts.get.loading}>
      <Receive to="/receive">Receive</Receive>
      BALANCE
      {Object.keys(accounts.get.data.balances).map(asset => [
        <Main key={`${asset}Main`}>
          {accounts.get.data.balances[asset].denominationsAvailable.main.amount}{' '}
          {accounts.get.data.balances[asset].denominationsAvailable.main.sign}
        </Main>,
        <Additional key={`${asset}Additional`}>
          {accounts.get.data.balances[asset].denominationsAvailable.additional.amount}{' '}
          {accounts.get.data.balances[asset].denominationsAvailable.additional.sign}
        </Additional>,
      ])}
      <Send to={totalBalance === 0 ? '/receive' : '/send'}>
        {totalBalance === 0 ? 'Receive' : 'Pay'}
      </Send>
    </Root>
  );
};

BalanceSummary.propTypes = {};

BalanceSummary.defaultProps = {};

export default BalanceSummary;
