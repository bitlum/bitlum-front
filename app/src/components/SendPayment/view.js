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

const SendPayment = ({ payments }) => {
  return (
    <Root
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
      Send payment
      <Input
        id="sendAmount"
        type="number"
        placeholder="Amount input"
        step="any"
        labelValid="VALID LABEL"
        labelInvalid="INVALID INPUT"
        required
      />
      <Input
        id="sendAddress"
        type="text"
        placeholder="Address input"
        labelValid="address"
        labelInvalid="address invalid"
        required
      />
      <Button primary type="submit">
        Send
      </Button>
      {payments.send.error && <Message type="error"> {payments.send.error.message} </Message>}
      {payments.send.data && <Message type="info"> Sent: {payments.send.data.txid} </Message>}
    </Root>
  );
};

SendPayment.propTypes = {};

SendPayment.defaultProps = {};

export default SendPayment;
