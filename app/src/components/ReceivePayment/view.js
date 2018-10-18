/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import log from 'utils/logging';

import { Root, Input, Button, Message, P, Select } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export class ReceivePayment extends Component {
  constructor() {
    super();
    this.state = {
      type: 'lightning',
    };
  }

  render() {
    const { type } = this.state;
    const { payments, className, t } = this.props;

    return (
      <Root
        className={className}
        onSubmit={e => {
          e.preventDefault();
          const amountElement = e.target.querySelector('#receiveAmount');
          const amountValue = amountElement && amountElement.value;
          const typeElement = e.target.querySelector('#receiveType');
          const typeValue = typeElement && typeElement.value;
          payments.receive.run(typeValue, amountValue, 'BTC');
        }}
        loading={payments.receive.loading}
      >
        <P>Receive payment </P>
        {type === 'lightning' ? (
          <Input
            id="receiveAmount"
            type="number"
            placeholder="Amount"
            step="any"
            labelValid="Amount"
            labelInvalid="Invalid amount"
            required
          />
        ) : null}
        <Select
          id="receiveType"
          value={type}
          onChange={e => {
            this.setState({ type: e.target.value });
          }}
        >
          <option value="lightning">Lightning</option>
          <option value="blockchain">Blockchain</option>
        </Select>
        <Button primary type="submit">
          Get {type === 'lightning' ? 'invoice' : 'address'}
        </Button>
        {payments.receive.data && (
          <Message type="info">Send here {payments.receive.data.wuid}</Message>
        )}
        {payments.receive.error && <Message type="error">{payments.receive.error.message}</Message>}
      </Root>
    );
  }
}

ReceivePayment.propTypes = {};

ReceivePayment.defaultProps = {};

export default ReceivePayment;
