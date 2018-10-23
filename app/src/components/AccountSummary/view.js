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

import { Root, Input, Button, P } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const AccountInfo = ({ accounts, className, t }) => {
  if (accounts.get.error || !accounts.get.data) {
    return (
      <Root className={className}>
        Error loading account data
        <NavLink key="/signout" to="/signout">
          {t('nav.signout')}
        </NavLink>
      </Root>
    );
  }
  return (
    <Root className={className} loading={accounts.get.loading}>
      <P>{accounts.get.data.email}</P>
      <NavLink key="/signout" to="/signout">
        <Button primary>{t('nav.signout')}</Button>
      </NavLink>
    </Root>
  );
};

AccountInfo.propTypes = {};

AccountInfo.defaultProps = {};

export default AccountInfo;
