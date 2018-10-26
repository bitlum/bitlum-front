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

import { Root, Input, Button, Message, P, Span, Select, QRcode, CopyButton } from './styles';

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

  componentDidUpdate(prevProps, prevState) {
    const { payments } = this.props;
    const { type } = this.state;
    if (prevState.type !== type) {
      payments.receive.cleanup();
    }
    if (prevState.type !== type && type === 'blockchain') {
      payments.receive.run('blockchain', null, 'BTC');
    }
  }

  componentWillUnmount() {
    const { payments } = this.props;
    payments.receive.cleanup();
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
        <P>Receive payment</P>
        <Span>You can receive both lightning and blockchain payments</Span>
        <Span>
          To receive in lightning you need to specify exact amount that you want to receive
        </Span>
        <Span>
          To receive in blockchain just send whatever amount you want to showed blockchain address
          (if you do not see the address just select "Blockchain" in the dropdown below)
        </Span>
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
          Receive
        </Button>
        {payments.receive.data && [
          <QRcode key="recaiveQR" value={payments.receive.data.wuid || ''} size="180" />,
          <Message type="info" key="receiveText">
            Send here {payments.receive.data.wuid}
            <CopyButton copyData={payments.receive.data.wuid} />
          </Message>,
        ]}
        {payments.receive.error && <Message type="error">{payments.receive.error.message}</Message>}
      </Root>
    );
  }
}

ReceivePayment.propTypes = {};

ReceivePayment.defaultProps = {};

export default ReceivePayment;
