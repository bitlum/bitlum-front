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

import { Root, Input, Button, Message } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const SignupForm = ({ accounts, className, t }) => (
  <Root
    className={className}
    onSubmit={e => {
      e.preventDefault();
      const emailElement = e.target.querySelector('#signupEmail');
      const email = emailElement && emailElement.value;
      const passwordElement = e.target.querySelector('#signupPassword');
      const password = passwordElement && passwordElement.value;
      const referralElement = e.target.querySelector('#signupReferral');
      const referral = referralElement && referralElement.value;
      accounts.signup.run(email, password, referral);
    }}
    loading={accounts.signup.loading}
  >
    <Input
      id="signupEmail"
      type="email"
      placeholder="Email of new account"
      labelValid={t('auth.email')}
      labelInvalid={t('auth.emailInvalid')}
      required
    />
    <Input
      id="signupPassword"
      type="password"
      placeholder="Password of new account"
      labelValid={t('auth.password')}
      labelInvalid={t('auth.passwordInvalid')}
      required
    />
    <Input
      id="signupReferral"
      type="text"
      placeholder="Referral"
      labelValid="Referral"
      labelInvalid="Referral"
      required
    />
    <Button primary type="submit">
      {t('nav.signup')}
    </Button>
    {accounts.signup.error && <Message type="error">{accounts.signup.error.message}</Message>}
  </Root>
);

SignupForm.propTypes = {};

SignupForm.defaultProps = {};

export default SignupForm;
