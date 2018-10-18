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

import { Root, Input, Button, Div, Span, Pre } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const AccountInfo = ({ accounts, className, t }) => {
  if (accounts.get.error || !accounts.get.data) {
    return <Root className={className}>Error loading account data</Root>;
  }
  return (
    <Root className={className} loading={accounts.get.loading}>
      <Div>
        <Span>Account ID: </Span>
        {accounts.get.data.auid}
      </Div>
      <Div>
        <Span>Email: </Span> {accounts.get.data.email}
      </Div>
      <Div>
        <Span>Restrictions: </Span>{' '}
        <Pre>{JSON.stringify(accounts.get.data.restrictions || {}, null, 2)}</Pre>
      </Div>
      <Div>
        <Span>Balances: </Span>{' '}
        <Pre>{JSON.stringify(accounts.get.data.balances || {}, null, 2)}</Pre>
      </Div>
    </Root>
  );
};

AccountInfo.propTypes = {};

AccountInfo.defaultProps = {};

export default AccountInfo;
