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
  Fees,
  SendResult,
  SendResultDesc,
  SendResultCta,
  SendResultIcon,
  SwitchDenomination,
  Description,
  Submit,
  Message,
  P,
  Done,
  Img,
  Span,
  Vendor,
  AmountInput,
  AmountInputWraper,
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
    payments.estimate.run(payment.wuid, payment.amount, payment.asset);
  }
  componentWillUnmount() {
    const { payments } = this.props;
    payments.send.cleanup();
    payments.estimate.cleanup();
  }

  render() {
    const { payment, payments, vendors, settings, accounts, className, t } = this.props;
    const { amounts, denominationPairs, selectedDenomination } = this.state;

    const { denominations } =
      ((payments.estimate.data || payments.estimate.error) &&
        payments.calcDenominations(
          payments.estimate.data ||
            (payments.estimate.error && {
              asset: payment.asset,
              fees: payments.estimate.error.fees,
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
        loading={payments.estimate.loading || payments.send.loading}
      >
        {payments.send.data ? (
          <SendResult status={payments.send.data.status}>
            <SendResultIcon status={payments.send.data.status} />
            <P>Payment {payments.send.data.status}</P>
            <SendResultDesc>
              {t(`confirmed.${payments.send.data.status}.description`)}
            </SendResultDesc>
            <SendResultCta
              className={payments.send.data.status === 'failed' ? 'openIntercom' : ''}
              onClick={e => {
                if (payments.send.data.status === 'pending') {
                  window.location.hash = '';
                }
              }}
            >
              {t(`confirmed.${payments.send.data.status}.cta`)}
            </SendResultCta>
            <Done
              primary
              onClick={e => {
                e.preventDefault();
                window.close();
              }}
            >
              Done
            </Done>
          </SendResult>
        ) : null}
        {vendors.get.error ? (
          <Vendor>Unable to load vendor data</Vendor>
        ) : (
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
        )}
        <AmountInputWraper>
          <AmountInput
            ref={input => input && input.focus()}
            id="sendAmount"
            type="number"
            step={
              1 /
              10 ** settings.get.data.denominations[payment.asset][selectedDenomination].precision
            }
            min="0"
            value={
              payment.amount != 0
                ? denominations && denominations[selectedDenomination].amount
                : amounts.current
            }
            disabled={payment.amount != 0}
            onChange={e => {
              if (!payments.estimate.loading) {
                this.setState({ amounts: { current: e.target.value } });
                payments.estimate.run(
                  payment.wuid,
                  e.target.value /
                    settings.get.data.denominations[payment.asset][selectedDenomination].price,
                  payment.asset,
                );
              }
            }}
            required
          />
          <SwitchDenomination
            primary
            disabled={!denominations}
            onClick={e => {
              e.preventDefault();
              this.setState({
                selectedDenomination: denominationPairs[selectedDenomination],
                amounts: {
                  current: denominations[denominationPairs[selectedDenomination]].amount.toFixed(
                    denominations[denominationPairs[selectedDenomination]].precision,
                  ),
                },
              });
            }}
          >
            {denominations && denominations[denominationPairs[selectedDenomination]].sign}
          </SwitchDenomination>
        </AmountInputWraper>
        <BalanceSummary
          appearance="onlyBalance"
          denomination={selectedDenomination}
          accounts={accounts}
        />
        {false && <Message type="error"> {{}.message} </Message>}
        {payments.estimate.error && (
          <Message type="error"> {payments.estimate.error.message} </Message>
        )}
        {payments.send.error && <Message type="error"> {payments.send.error.message} </Message>}
        {payment.description ? (
          <Description>
            <Span>Description</Span> <Span>{payment.description}</Span>
          </Description>
        ) : null}
        <Fees>
          <Span>Fee</Span>
          <Span>
            {denominations &&
              denominations[selectedDenomination].fees === 0 &&
              denominations[denominationPairs[selectedDenomination]].fees !== 0 &&
              '≈'}{' '}
            {denominations &&
              `${denominations[selectedDenomination].fees.toFixed(
                denominations[selectedDenomination].precision,
              )} ${denominations[selectedDenomination].sign}`}
          </Span>
        </Fees>
        <Submit primary type="submit">
          <Span>Pay</Span>
          <Span>
            {denominations &&
              denominations[selectedDenomination].total === 0 &&
              denominations[denominationPairs[selectedDenomination]].total !== 0 &&
              '≈'}{' '}
            {denominations &&
              `${(-1 * denominations[selectedDenomination].total).toFixed(
                denominations[selectedDenomination].precision,
              )} ${denominations[selectedDenomination].sign}`}
          </Span>
        </Submit>
      </Root>
    );
  }
}

PaymentConfirmation.propTypes = {};

PaymentConfirmation.defaultProps = {};

export default PaymentConfirmation;
