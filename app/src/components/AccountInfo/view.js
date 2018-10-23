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

import { Root, Input, Button, P, Span } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const AccountInfo = ({ accounts, className, t }) => {
  if (accounts.get.error || !accounts.get.data) {
    return <Root className={className}>Error loading account data</Root>;
  }
  return (
    <Root className={className} loading={accounts.get.loading}>
      <P>
        <Span>Your email: </Span> {accounts.get.data.email}
      </P>
      <P>
        <Span>Your ID: </Span>
        {accounts.get.data.auid}
      </P>
      {accounts.get.data.restrictions
        ? [
            <P>
              <Span>Maxium balance allowed: </Span> 12<Span>Your email: </Span>
            </P>,
            <P>
              <Span>Restrictions: </Span> {}
            </P>,
          ]
        : null}
    </Root>
  );
};

AccountInfo.propTypes = {};

AccountInfo.defaultProps = {};

export default AccountInfo;
