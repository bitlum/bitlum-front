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

export const RestoreForm = ({ accounts, className, history, t, exists }) => (
  <Root
    className={className}
    onSubmit={e => {
      e.preventDefault();
      const emailElement = e.target.querySelector('#restoreEmail');
      const email = emailElement && emailElement.value;
      accounts.sendRestoreLink.run({ body: { email } });
    }}
    loading={accounts.sendRestoreLink.loading}
  >
    <Input
      id="restoreEmail"
      type="email"
      placeholder="Email"
      labelValid={t('auth.email')}
      labelInvalid={t('auth.emailInvalid')}
      required
    />
    {accounts.sendRestoreLink.error && (
      <Message type="error">
        {t([`errors.${accounts.sendRestoreLink.error.code}`, 'errors.default'])}
      </Message>
    )}
    {accounts.sendRestoreLink.data && (
      <Message type="info">
        {t('account.restoreSent', {
          email:
            document.querySelector('#restoreEmail') &&
            document.querySelector('#restoreEmail').value,
        })}
      </Message>
    )}
    <Button primary type="submit">
      {t('nav.restore')}
    </Button>
  </Root>
);

RestoreForm.propTypes = {};

RestoreForm.defaultProps = {};

export default RestoreForm;
