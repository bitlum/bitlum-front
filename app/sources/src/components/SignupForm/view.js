/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';

import logger from 'utils/logging';

import { Root, Input, Button, Message, A, P } from './styles';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const SignupForm = ({ accounts, className, history, t, exists }) => (
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
      placeholder="Email"
      labelValid={t('auth.email')}
      labelInvalid={t('auth.emailInvalid')}
      required
    />
    <Input
      id="signupPassword"
      type="password"
      placeholder="Password"
      labelValid={t('auth.password')}
      labelInvalid={t('auth.passwordInvalid')}
      required
    />
    <P>Have you been invited by someone?</P>
    <Input
      id="signupReferral"
      type="text"
      placeholder="Email of person that invited you"
      labelValid="Email of person that invited you"
      labelInvalid="Email of person that invited you"
    />

    {accounts.signup.error && (
      <Message type="error">
        <Trans i18nKey={[`errors.${accounts.signup.error.code}`, 'errors.default']}>
          {' '}
          <A
            onClick={() => {
              history.push('/login');
            }}
          >
            {' '}
          </A>
        </Trans>
      </Message>
    )}
    <Button primary type="submit">
      {t('nav.signup')}
    </Button>
  </Root>
);

SignupForm.propTypes = {};

SignupForm.defaultProps = {};

export default SignupForm;
