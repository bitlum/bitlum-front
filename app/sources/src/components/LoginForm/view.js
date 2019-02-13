/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import logger from 'utils/logging';

import { Root, Input, Button, Message } from './styles';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const LoginForm = ({ accounts, className, t }) => (
  <Root
    className={className}
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
      placeholder="Your email"
      labelValid="Email"
      labelInvalid="Invalid email"
      required
    />
    <Input
      id="authPassword"
      type="password"
      placeholder="Your password"
      labelValid="Password"
      labelInvalid="Password invalid"
      required
    />

    {accounts.authenticate.error && (
      <Message type="error">
        {t([`errors.${accounts.authenticate.error.code}`, 'errors.default'])}
      </Message>
    )}
    {accounts.authenticate.data && Object.keys(accounts.authenticate.data).length === 0 && (
      <Message type="error">No account was found with such email</Message>
    )}
    <Button primary type="submit">
      Login
    </Button>
  </Root>
);

LoginForm.propTypes = {};

LoginForm.defaultProps = {};

export default LoginForm;
