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

import { Root, Input, Button, Message, P, Span, DestinationInfo, AmountInput } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export class SendPayment extends Component {
  state = { amount: undefined, destination: this.props.prefill && this.props.prefill.invoice };

  componentWillUnmount() {
    const { payments } = this.props;
    payments.send.cleanup();
  }

  componentDidMount() {
    const { prefill, wallets } = this.props;
    if (prefill && prefill.invoice) {
      wallets.getDetails.run(prefill.invoice, 'BTC');
    }
  }
  // static getDerivedStateFromProps(props, state) {
  //   const { prefill, wallets } = props;
  //   if (prefill && prefill.invoice) {
  //     this.setState({ amount: undefined, destination: prefill.invoice });
  //     // wallets.getDetails.run(prefill.invoice, 'BTC');
  //   }
  //   return state;
  // }

  render() {
    const { prefill, payments, wallets, className, t } = this.props;

    return (
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
        <P>Send payment</P>
        <Span>You can send both lightning and blockchain payments</Span>
        <Span>
          To pay with lightning just insert lightning invoice in "Destination" field and we will
          show payment details like amount, to whom you sending e.t.c.
        </Span>
        <Span>
          To pay with blockchain you will need to specify exact amount that you want to send after
          inserting blockchain address in "Destination" field
        </Span>
        <AmountInput
          id="sendAmount"
          hidden={
            !wallets.getDetails.data ||
            (wallets.getDetails.data.type === 'lightning' && wallets.getDetails.data.value !== '0')
          }
          type="number"
          placeholder={t('payments.amount')}
          step="any"
          labelValid={t('payments.amount')}
          labelInvalid={t('payments.amountInvalid')}
          value={this.state.amount || (wallets.getDetails.data && wallets.getDetails.data.value)}
          onChange={e => {
            this.setState({ amount: e.target.value });
          }}
          required
        />
        <Input
          id="sendAddress"
          type="text"
          placeholder="Destination"
          labelValid="Destination"
          labelInvalid="Destination invalid"
          value={this.state.destination}
          onChange={e => {
            this.setState({ amount: undefined, destination: e.target.value });
            wallets.getDetails.run(e.target.value, 'BTC');
          }}
          required
        />

        {wallets.getDetails.data &&
          wallets.getDetails.data.type !== 'blockchain' && (
            <DestinationInfo>
              <P>
                <Span>Amount: </Span>
                {wallets.getDetails.data.value}
              </P>
              <P>
                <Span>Destination: </Span>
                {wallets.getDetails.data.destination}
              </P>
              {wallets.getDetails.data.memo && (
                <P>
                  <Span>Notes: </Span>
                  {wallets.getDetails.data.memo}
                </P>
              )}
            </DestinationInfo>
          )}
        <Button primary type="submit">
          Send
        </Button>
        {wallets.getDetails.error && (
          <Message type="error"> {wallets.getDetails.error.message} </Message>
        )}
        {payments.send.error && <Message type="error"> {payments.send.error.message} </Message>}
        {payments.send.data && <Message type="info"> Sent: {payments.send.data.txid} </Message>}
      </Root>
    );
  }
}

SendPayment.propTypes = {};

SendPayment.defaultProps = {};

export default SendPayment;
