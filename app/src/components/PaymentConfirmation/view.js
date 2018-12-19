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
  Img,
  Span,
  Vendor,
  AmountInput,
  BalanceSummary,
} from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export class PaymentConfirmation extends Component {
  state = {
    amounts: {
      current: this.props.payment.amount,
      previous: undefined,
    },
    selectedDenomination: 'main',
    denominationPairs: {
      main: 'additional',
      additional: 'main',
    },
  };
  componentWillMount() {
    const { payments, payment } = this.props;
    payments.send.run(payment.wuid, payment.amount, payment.asset, { estimate: true });
  }
  componentWillUnmount() {
    const { payments } = this.props;
    payments.send.cleanup();
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
    const { payment, payments, vendors, settings, accounts, className, t } = this.props;
    const { amounts, denominationPairs, selectedDenomination } = this.state;

    const { denominations } =
      ((payments.send.data || payments.send.error) &&
        payments.calcDenominations(
          payments.send.data ||
            (payments.send.error && {
              asset: payment.asset,
              fees: payments.send.error.fees,
              amount:
                amounts.current /
                settings.get.data.denominations[payment.asset][selectedDenomination].price,
            }),
        )) ||
      {};

    return (
      <Root
        className={className}
        onSubmit={e => {
          e.preventDefault();
          payments.send.run(
            payment.wuid,
            amounts.current /
              settings.get.data.denominations[payment.asset][selectedDenomination].price,
            payment.asset,
          );
        }}
        loading={payments.send.loading}
      >
        <Vendor>
          <Img
            src={
              (vendors.get.data && vendors.get.data.icon) ||
              'https://static.thenounproject.com/png/404950-200.png'
            }
          />
          <P>{(vendors.get.data && vendors.get.data.name) || 'Unknown'}</P>
          <P>{payment.wuid}</P>
        </Vendor>
        {payment.description}
        <AmountInput
          id="sendAmount"
          type="number"
          placeholder={t('payments.amount')}
          step="any"
          labelValid={t('payments.amount')}
          labelInvalid={t('payments.amountInvalid')}
          value={
            payment.amount != 0
              ? denominations && denominations[selectedDenomination].amount
              : amounts.current
          }
          disabled={payment.amount != 0}
          onChange={e => {
            if (!payments.send.loading) {
              this.setState({ amounts: { current: e.target.value } });
              payments.send.run(
                payment.wuid,
                e.target.value /
                  settings.get.data.denominations[payment.asset][selectedDenomination].price,
                payment.asset,
                { estimate: true },
              );
            }
          }}
          required
        />
        <BalanceSummary
          appearance="onlyBalance"
          denomination={selectedDenomination}
          accounts={accounts}
        />
        <P>
          Fee:{' '}
          {denominations &&
            denominations[selectedDenomination].fees === 0 &&
            denominations[denominationPairs[selectedDenomination]].fees !== 0 &&
            '~'}{' '}
          {denominations &&
            `${denominations[selectedDenomination].fees.toFixed(
              denominations[selectedDenomination].precision,
            )} ${denominations[selectedDenomination].sign}`}
        </P>
        <Button
          primary
          disabled={!denominations}
          onClick={e => {
            e.preventDefault();
            this.setState({
              selectedDenomination: denominationPairs[selectedDenomination],
              amounts: { current: denominations[denominationPairs[selectedDenomination]].amount },
            });
          }}
        >
          Switch to {denominations && denominations[denominationPairs[selectedDenomination]].sign}
        </Button>
        {false && <Message type="error"> {{}.message} </Message>}
        {payments.send.error && <Message type="error"> {payments.send.error.message} </Message>}
        <Button primary type="submit">
          Pay{' '}
          {denominations &&
            denominations[selectedDenomination].total === 0 &&
            denominations[denominationPairs[selectedDenomination]].total !== 0 &&
            '~'}{' '}
          {denominations &&
            `${(-1 * denominations[selectedDenomination].total).toFixed(
              denominations[selectedDenomination].precision,
            )} ${denominations[selectedDenomination].sign}`}
        </Button>
      </Root>
    );
  }
}

PaymentConfirmation.propTypes = {};

PaymentConfirmation.defaultProps = {};

export default PaymentConfirmation;
