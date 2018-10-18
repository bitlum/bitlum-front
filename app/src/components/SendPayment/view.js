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

import { Root, Input, Button, Message, P } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const SendPayment = ({ payments, className, t }) => (
  <Root
    className={className}
    onSubmit={e => {
      e.preventDefault();
      const amountElement = e.target.querySelector('#sendAmount');
      const amount = amountElement && amountElement.value;
      const addressElement = e.target.querySelector('#sendAddress');
      const address = addressElement && addressElement.value;
      payments.send.run(address, amount, 'BTC');
    }}
    loading={payments.send.loading}
  >
    <P> Send payment </P>
    <Input
      id="sendAmount"
      type="number"
      placeholder={t('payments.amount')}
      step="any"
      labelValid={t('payments.amount')}
      labelInvalid={t('payments.amountInvalid')}
      required
    />
    <Input
      id="sendAddress"
      type="text"
      placeholder="Address"
      labelValid="Address"
      labelInvalid="Address invalid"
      required
    />
    <Button primary type="submit">
      Send
    </Button>
    {payments.send.error && <Message type="error"> {payments.send.error.message} </Message>}
    {payments.send.data && <Message type="info"> Sent: {payments.send.data.txid} </Message>}
  </Root>
);

SendPayment.propTypes = {};

SendPayment.defaultProps = {};

export default SendPayment;
