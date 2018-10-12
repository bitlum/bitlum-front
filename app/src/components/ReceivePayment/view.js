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

const ReceivePayment = ({ payments }) => {
  return (
    <Root
      onSubmit={e => {
        e.preventDefault();
        const amountElement = e.target.querySelector('#receiveAmount');
        const amount = amountElement && amountElement.value;
        const typeElement = e.target.querySelector('#receiveType');
        const type = typeElement && typeElement.value;
        payments.receive.run(type, amount, 'BTC');
      }}
      loading={payments.receive.loading}
    >
      <p>Receive payment</p>
      <Input
        id="receiveAmount"
        type="number"
        placeholder="Amount input"
        step="any"
        labelValid="VALID LABEL"
        labelInvalid="INVALID INPUT"
        required
      />
      <Input
        id="receiveType"
        type="text"
        placeholder="Type input"
        labelValid="address"
        labelInvalid="address invalid"
        required
      />
      <Button primary type="submit">
        Get address
      </Button>
      {payments.receive.data && (
        <Message type="info">Send here {payments.receive.data.wuid}</Message>
      )}
      {payments.receive.error && (
        <Message type="error">{payments.receive.error.message}</Message>
      )}
    </Root>
  );
};

ReceivePayment.propTypes = {};

ReceivePayment.defaultProps = {};

export default ReceivePayment;
