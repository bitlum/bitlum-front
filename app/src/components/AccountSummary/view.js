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
import { NavLink } from 'react-router-dom';

import log from 'utils/logging';

import { Root, Input, Button } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const AccountInfo = ({ accounts }) => {
  if (accounts.get.error || !accounts.get.data) {
    return (
      <Root>
        Error loading account data
        <NavLink key="/signout" to="/signout">
          Signout
        </NavLink>
      </Root>
    );
  }
  return (
    <Root loading={accounts.get.loading}>
      <p>Email: {accounts.get.data.email}</p>
      <NavLink key="/signout" to="/signout">
        Signout
      </NavLink>
    </Root>
  );
};

AccountInfo.propTypes = {};

AccountInfo.defaultProps = {};

export default AccountInfo;
