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

import { Root, Input, Button, Message } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const AuthForm = ({ accounts }) => {
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
      {accounts.authenticate.error && (
        <Message type="error">{accounts.authenticate.error.message}</Message>
      )}
      {accounts.authenticate.data && Object.keys(accounts.authenticate.data).length === 0 && (
        <Message type="error">No account was found with such email</Message>
      )}
    </Root>
  );
};

AuthForm.propTypes = {};

AuthForm.defaultProps = {};

export default AuthForm;
