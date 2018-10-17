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

const SignupForm = ({ accounts }) => {
  return (
    <Root
      onSubmit={e => {
        e.preventDefault();
        const emailElement = e.target.querySelector('#authEmail');
        const email = emailElement && emailElement.value;
        const passwordElement = e.target.querySelector('#authPassword');
        const password = passwordElement && passwordElement.value;
        accounts.signup.run(email, password);
      }}
      loading={accounts.signup.loading}
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
      <Button primary type="submit">Sign Up</Button>
      {accounts.signup.error && (
        <Message type="error">{accounts.signup.error.message}</Message>
      )}
    </Root>
  );
};

SignupForm.propTypes = {};

SignupForm.defaultProps = {};

export default SignupForm;
