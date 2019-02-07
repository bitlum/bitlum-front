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
} from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export class ReceivePayment extends Component {
  // componentDidUpdate(prevProps, prevState) {
  //   const { payments, receive } = this.props;
  //   payments.receive.run(receive.type, null, receive.asset);
  // }
  state = {
    amountsCurrent: undefined,
    amountsPrevious: undefined,
    amountChanged: false,
    selectedDenomination: 'main',
    denominationPairs: {
      main: 'additional',
      additional: 'main',
    },
  };

  componentWillUnmount() {
    const { payments } = this.props;
    payments.receive.cleanup();
  }

  render() {
    const { payments, settings, history, receive, className, t } = this.props;
    const {
      selectedDenomination,
      denominationPairs,
      amountsCurrent,
      amountsPrevious,
      amountChanged,
    } = this.state;

    if (!receive) {
      return (
        <Root className={className}>
          <P>Receive type not selected</P>
        </Root>
      );
    }

    return (
      <Root
        className={className}
        onSubmit={e => {
          e.preventDefault();
          payments.receive.run(
            receive.type,
            (amountsCurrent || 0) /
              settings.get.data.denominations[receive.asset][selectedDenomination].price,
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
            {settings.get.data.denominations[receive.asset][selectedDenomination].sign}
            <AmountInput
              length={(amountsCurrent || '').toString().length}
              ref={input => input && input.focus()}
              id="sendAmount"
              type="number"
              placeholder="0"
              step={
                1 /
                10 **
                  settings.get.data.denominations[receive.asset][selectedDenomination].precisionMax
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
                const convertedAmount = settings.get.data.denominations[receive.asset][
                  denominationPairs[selectedDenomination]
                ].round(
                  ((amountsCurrent || 0) /
                    settings.get.data.denominations[receive.asset][selectedDenomination]
                      .price) *
                    settings.get.data.denominations[receive.asset][
                      denominationPairs[selectedDenomination]
                    ].price,
                );
                this.setState({
                  amountChanged: false,
                  selectedDenomination: denominationPairs[selectedDenomination],
                  amountsPrevious: amountsCurrent,
                  amountsCurrent: !amountChanged
                    ? amountsPrevious
                    : convertedAmount === 0 ? undefined : convertedAmount ,
                });
              }}
            >
              {
                settings.get.data.denominations[receive.asset][
                  denominationPairs[selectedDenomination]
                ].sign
              }
            </SwitchDenomination>
          </AmountInputWraper>
        ) : null}
        {payments.receive.data &&
          payments.receive.data.type === receive.type && [
            <QRcode key="recaiveQR" value={payments.receive.data.wuid || ''} size={220} />,
            <P>
              <Span>{payments.receive.data.wuid}</Span>
              <CopyButton data={payments.receive.data.wuid} />
            </P>,
          ]}
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
                : `${settings.get.data.denominations[receive.asset][selectedDenomination].stringify(
                    amountsCurrent,
                    { omitDirection: true },
                  )}`}
            </Button>
          ) : (
            <P
              primary
              onClick={e => {
                e.preventDefault();
                history.push('/payments');
              }}
            >
              <Span>After you will send payment you will see it in the payment list</Span>
              <Span>Go to payments list</Span>
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
