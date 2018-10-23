/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import log from 'utils/logging';

import { Root, Pending, Available, Div, Button } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const AccountInfo = ({ accounts, className, t }) => {
  if (accounts.get.error || !accounts.get.data) {
    return <Root className={className}>Error loading account data</Root>;
  }
  return (
    <Root className={className} loading={accounts.get.loading}>
      Available balance:
      {Object.keys(accounts.get.data.balances).map(asset => [
        <Available key={`${asset}Available`}>
          {Math.floor(accounts.get.data.balances[asset].available * 10 ** 8) / 10 ** 8} {asset}
        </Available>,
        // <Pending key={`${asset}Pending`}>
        //   Pending {Math.floor(accounts.get.data.balances[asset].pending * 10 ** 8) / 10 ** 8}{' '}
        //   {asset}
        // </Pending>,
      ])}
    </Root>
  );
};

AccountInfo.propTypes = {};

AccountInfo.defaultProps = {};

export default AccountInfo;
