/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logger from 'utils/logging';

import {
  Root,
  Input,
  Button,
  Message,
  P,
  Span,
  Select,
  QRcode,
  CopyButton,
  AssetSelector,
  AssetItem,
  AmountInputWraper,
  AmountInput,
  SwitchDenomination,
  Footer,
  SendResult,
  SendResultIcon,
} from './styles';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export class ReceivePayment extends Component {
  state = {
    amountsCurrent: undefined,
    amountsPrevious: undefined,
    amountChanged: false,
    mountedAt: new Date().getTime(),
    selectedDenomination: 'main',
    denominationPairs: {
      main: 'additional',
      additional: 'main',
    },
  };

  componentWillUnmount() {
    const { payments } = this.props;
    payments.receive.cleanup('all');
  }

  render() {
    const { payments, denominations, history, receive, className, t } = this.props;
    const {
      selectedDenomination,
      denominationPairs,
      amountsCurrent,
      amountsPrevious,
      amountChanged,
      mountedAt,
    } = this.state;

    if (!receive) {
      return (
        <Root className={className}>
          <P>Receive type not selected</P>
        </Root>
      );
    }

    if (!denominations.get.data || denominations.get.loading) {
      return (
        <Root className={className}>
          <P>Loading...</P>
        </Root>
      );
    }

    const isReceived =
      payments.receive.data &&
      payments.get.data &&
      payments.get.data.find(
        payment => payment.receipt === payments.receive.data.wuid && payment.updatedAt >= mountedAt,
      );

    return (
      <Root
        className={className}
        onSubmit={e => {
          e.preventDefault();
          payments.receive.run(
            receive.type,
            (amountsCurrent || 0) /
              denominations.get.data[receive.asset][selectedDenomination].price,
            receive.asset,
          );
        }}
        loading={payments.receive.loading}
      >
        <Message type="info" key="receiveText">
          {payments.receive.data
            ? t(`receive.tips.${receive.type}.main`)
            : t(
                `receive.tips.${receive.type}.${
                  receive.type === 'lightning' ? 'beforeAmount' : 'main'
                }`,
              )}
        </Message>

        {receive.type === 'lightning' &&
        (!payments.receive.data || payments.receive.data.type !== 'lightning') ? (
          <AmountInputWraper>
            {denominations.get.data[receive.asset][selectedDenomination].sign}
            <AmountInput
              length={(amountsCurrent || '').toString().length}
              ref={input => input && input.focus()}
              id="sendAmount"
              type="number"
              placeholder="0"
              step={
                1 / 10 ** denominations.get.data[receive.asset][selectedDenomination].precisionMax
              }
              value={amountsCurrent}
              min="0"
              onChange={e => {
                this.setState({ amountsCurrent: e.target.value, amountChanged: true });
              }}
            />
            <SwitchDenomination
              primary
              onClick={e => {
                e.preventDefault();
                const convertedAmount = denominations.get.data[receive.asset][
                  denominationPairs[selectedDenomination]
                ].round(
                  ((amountsCurrent || 0) /
                    denominations.get.data[receive.asset][selectedDenomination].price) *
                    denominations.get.data[receive.asset][denominationPairs[selectedDenomination]]
                      .price,
                );
                this.setState({
                  amountChanged: false,
                  selectedDenomination: denominationPairs[selectedDenomination],
                  amountsPrevious: amountsCurrent,
                  amountsCurrent: !amountChanged
                    ? amountsPrevious
                    : convertedAmount === 0
                    ? undefined
                    : convertedAmount,
                });
              }}
            >
              {denominations.get.data[receive.asset][denominationPairs[selectedDenomination]].sign}
            </SwitchDenomination>
          </AmountInputWraper>
        ) : null}
        {payments.receive.data &&
          payments.receive.data.type === receive.type &&
          (isReceived ? (
            <SendResult>
              <SendResultIcon />
              <P>Payment received!</P>
            </SendResult>
          ) : (
            [
              <QRcode key="recaiveQR" value={payments.receive.data.wuid || ''} size={220} />,
              <P>
                <Span>{payments.receive.data.wuid}</Span>
                <CopyButton data={payments.receive.data.wuid} />
              </P>,
            ]
          ))}
        {payments.receive.error && (
          <Message type="error">
            {t([`errors.${payments.receive.error.code}`, 'errors.default'])}
          </Message>
        )}
        <Footer>
          {receive.type === 'lightning' &&
          (!payments.receive.data || payments.receive.data.type !== 'lightning') ? (
            <Button primary type="submit">
              Generate invoice to receive{'\n '}
              {!amountsCurrent
                ? 'any amount'
                : `${denominations.get.data[receive.asset][selectedDenomination].stringify(
                    amountsCurrent,
                    { omitDirection: true },
                  )}`}
            </Button>
          ) : (
            <P
              primary
              onClick={e => {
                e.preventDefault();
                isReceived
                  ? history.push(`/payments/${isReceived.puid}`)
                  : history.push('/payments');
              }}
            >
              {!isReceived && (
                <Span>After you will send payment you will see it in the payment list</Span>
              )}
              <Span>{isReceived ? 'Go to payment details' : 'Go to payments list'}</Span>
            </P>
          )}
        </Footer>
      </Root>
    );
  }
}

ReceivePayment.propTypes = {};

ReceivePayment.defaultProps = {};

export default ReceivePayment;
