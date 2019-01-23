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

import { Root, Main, Additional, Receive, Send, Img, Span } from './styles';

import receiveIcon from 'assets/icons/plus-circle.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const BalanceSummary = ({ accounts, className, appearance = 'normal', denomination, t }) => {
  if (accounts.get.error && !accounts.get.data) {
    return (
      <Root className={className} appearance={appearance}>
        <Span>Unable to load balance info</Span>
      </Root>
    );
  }
  const totalBalance = Object.keys(accounts.get.data.balances)
    .map(asset => accounts.get.data.balances[asset].available)
    .reduce((p, c) => p + Number(c), 0);

  if (appearance === 'onlyBalance') {
    return (
      <Root className={className} loading={accounts.get.loading} appearance={appearance}>
        Available
        {Object.keys(accounts.get.data.balances).map(asset => [
          <Main key={`${asset}Main`}>
            {accounts.get.data.balances[asset].denominationsAvailable[denomination].toString()}
          </Main>,
        ])}
      </Root>
    );
  }
  return (
    <Root className={className} loading={accounts.get.loading} appearance={appearance}>
      <Receive to="/payments/receive/check">
        <Span>Receive</Span>
        <Img src={receiveIcon} />
      </Receive>
      {Object.keys(accounts.get.data.balances).map(asset => [
        <Main key={`${asset}Main`}>
          {accounts.get.data.balances[asset].denominationsAvailable.main.toString()}
        </Main>,
        <Additional key={`${asset}Additional`}>
          {accounts.get.data.balances[asset].denominationsAvailable.additional.toString()}
        </Additional>,
      ])}
      {/* <Send to={totalBalance === 0 ? '/payments/receive/check' : '/payments/check'}>
        {totalBalance === 0 ? 'Receive' : 'Pay'}
      </Send> */}
    </Root>
  );
};

BalanceSummary.propTypes = {};

BalanceSummary.defaultProps = {};

export default BalanceSummary;
