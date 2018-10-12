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

const AuthenticationWidget = ({ accounts }) => {
  return (
    <Root
      onSubmit={e => {
        e.preventDefault();
        const emailElement = e.target.querySelector('#authEmail');
        const email = emailElement && emailElement.value;
        const passwordElement = e.target.querySelector('#authPassword');
        const password = passwordElement && passwordElement.value;
        accounts.authenticate.run(email, password);
      }}
      loading={accounts.authenticate.loading}
    >
      <Input
        id="authEmail"
        type="email"
        placeholder="A small email input"
        labelValid="VALID LABEL"
        labelInvalid="INVALID INPUT"
        required
      />
      <Input
        id="authPassword"
        type="password"
        placeholder="A small password input"
        labelValid="Password"
        labelInvalid="Password invalid"
        required
      />
      <Button primary type="submit">Login</Button>
    </Root>
  );
};

AuthenticationWidget.propTypes = {};

AuthenticationWidget.defaultProps = {};

export default AuthenticationWidget;
