/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';

import log from 'utils/logging';

import { Root, Input, Button } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const AccountInfo = ({ accounts }) => {
  if (accounts.get.error || !accounts.get.data) {
    return <Root>Error loading account data</Root>;
  }
  return (
    <Root loading={accounts.get.loading}>
      <p>Account {accounts.get.data.auid} info: </p>
      <p>Email: {accounts.get.data.email}</p>
      <p>Restrictions: {JSON.stringify(accounts.get.data.restrictions || {}, null, 2)}</p>
      <p>Balances: {JSON.stringify(accounts.get.data.balances || {}, null, 2)}</p>
    </Root>
  );
};

AccountInfo.propTypes = {};

AccountInfo.defaultProps = {};

export default AccountInfo;
