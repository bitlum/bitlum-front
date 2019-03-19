/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import logger from 'utils/logging';

import LiveChat from 'utils/LiveChat';
import GA from 'utils/GA';

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
  Tip,
  Done,
  Img,
  Span,
  Vendor,
  AmountInput,
  AmountInputWraper,
  BalanceSummary,
  Loader,
} from './styles';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export class PaymentConfirmation extends Component {
  state = {
    amountsOriginal: this.props.payment.amount,
    amountsPrevious: undefined,
    amountsCurrent: undefined,
    selectedDenomination: 'main',
    denominationPairs: {
      main: 'additional',
      additional: 'main',
    },
  };

  componentDidMount() {
    const { payments, payment } = this.props;
    payments.estimate.run(payment.wuid, payment.amount, payment.asset, payment.amount != 0, {
      origin: payment.origin,
    });
  }

  componentWillUnmount() {
    const { payments } = this.props;
    payments.send.cleanup('all');
    payments.estimate.cleanup('all');
  }

  static getDerivedStateFromProps(props, state) {
    const denominations =
      (props.payments.estimate.data && props.payments.estimate.data.denominations) ||
      (props.payments.estimate.error && props.payments.estimate.error.denominations);

    if (!denominations || !props.payment || props.payment.amount == '0') {
      return null;
    }

    return {
      amountsCurrent:
        props.payment && props.payment.amount != 0
          ? denominations[state.selectedDenomination].amount
          : undefined,
    };
  }

  render() {
    const { payment, payments, vendors, accounts, className, t } = this.props;
    const {
      amountsOriginal,
      amountsPrevious,
      amountsCurrent,
      denominationPairs,
      selectedDenomination,
    } = this.state;

    if (
      !payments.estimate.data &&
      !payments.estimate.error &&
      !payments.send.data &&
      !payments.send.error
    ) {
      return <Root className={className} loading />;
    }

    const denominations =
      (payments.estimate.data && payments.estimate.data.denominations) ||
      (payments.estimate.error && payments.estimate.error.denominations);

    let closeTimeout;
    if (payments.send.data) {
      closeTimeout = setTimeout(window.close, 3000);
    }

    return (
      <Root
        className={className}
        onSubmit={async e => {
          e.preventDefault();
          const amount =
            amountsOriginal != 0
              ? amountsOriginal
              : (amountsCurrent || 0) / denominations[selectedDenomination].price;
          const result = await payments.send.run(payment.wuid, amount, payment.asset, {
            origin: payment.origin,
          });

          LiveChat.track(
            `${payment.origin || 'unknown'}_payment_${payment.asset}_${
              result.error ? 'error' : 'created'
            }`,
            {
              amount,
            },
          );

          LiveChat.track(`payment_${payment.asset}_${result.error ? 'error' : 'created'}`, {
            amount,
          });

          GA({
            type: 'event',
            category: 'payment',
            action: result.error ? 'error' : 'completed',
            label: payment.origin || 'unknown',
            value: payment.amount * 10 ** 8,
          });
        }}
        loading={payments.send.loading}
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
                  clearTimeout(closeTimeout);
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
          <Vendor color={vendors.get.data && vendors.get.data[0] && vendors.get.data[0].color}>
            <Img src={vendors.get.data && vendors.get.data[0] && vendors.get.data[0].iconUrl} />
            <P>
              <Span>{vendors.get.data && vendors.get.data[0] && vendors.get.data[0].name}</Span>
              <Span>{payment.wuid}</Span>
            </P>
          </Vendor>
        )}
        <AmountInputWraper>
          {denominations[selectedDenomination].sign}
          <AmountInput
            ref={input => input && input.focus()}
            length={(amountsCurrent || '').toString().length}
            placeholder="0"
            id="sendAmount"
            type="number"
            step={1 / 10 ** denominations[selectedDenomination].precisionMax}
            min="0"
            value={amountsCurrent}
            disabled={payment.amount != 0}
            onChange={e => {
              this.setState({ amountsCurrent: e.target.value });
              payments.estimate.run(
                payment.wuid,
                e.target.value / denominations[selectedDenomination].price,
                payment.asset,
                payment.amount != 0,
                { origin: payment.origin },
              );
            }}
            required
          />
          <SwitchDenomination
            primary
            disabled={!denominations}
            onClick={e => {
              e.preventDefault();
              const convertedAmount = denominations[denominationPairs[selectedDenomination]].round(
                denominations[denominationPairs[selectedDenomination]].amount,
              );
              this.setState({
                selectedDenomination: denominationPairs[selectedDenomination],
                amountsCurrent: convertedAmount === 0 ? undefined : convertedAmount,
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
          notEnough={
            !payments.estimate.loading &&
            !payments.estimate.debouncing &&
            payments.estimate.error &&
            payments.estimate.error.code === '403RPA01'
          }
        />
        {false && <Message type="error"> {{}.message} </Message>}
        {payments.estimate.error && !payments.estimate.loading && !payments.estimate.debouncing && (
          <Message type="error">
            {t([`errors.${payments.estimate.error.code}`, 'errors.default'], {
              amountString:
                denominations &&
                denominations[selectedDenomination].toString({
                  omitDirection: true,
                }).amount,
              feeString:
                denominations &&
                denominations[selectedDenomination].toString({
                  omitDirection: true,
                }).fees,
              pendingRequestsSum:
                payments.estimate.error.pendingRequestsSum &&
                denominations[selectedDenomination].stringify(
                  payments.estimate.error.pendingRequestsSum *
                    denominations[selectedDenomination].price,
                  { omitDirection: true },
                ),
            })}
          </Message>
        )}
        {payments.send.error && (
          <Message type="error">
            {t([`errors.${payments.send.error.code}`, 'errors.default'], {
              amountString:
                denominations &&
                denominations[selectedDenomination].toString({
                  omitDirection: true,
                }).amount,
              feeString:
                denominations &&
                denominations[selectedDenomination].toString({
                  omitDirection: true,
                }).fees,
              pendingRequestsSum:
                payments.send.error.pendingRequestsSum &&
                denominations[selectedDenomination].stringify(
                  payments.send.error.pendingRequestsSum *
                    denominations[selectedDenomination].price,
                  { omitDirection: true },
                ),
            })}
          </Message>
        )}
        {payment.description ? (
          <Description>
            <Span>Description</Span> <Span>{payment.description}</Span>
          </Description>
        ) : null}
        <Fees>
          <Span>
            <Tip id="feesTooltip">{t([`tips.fees.${payment.type}`])}</Tip>
            Fee
          </Span>
          <Span>
            {payments.estimate.loading || payments.estimate.debouncing
              ? [denominations && denominations[selectedDenomination].sign, <Loader />]
              : denominations &&
                denominations[selectedDenomination].toString({
                  omitDirection: true,
                }).fees}
          </Span>
        </Fees>
        <Submit
          primary
          type="submit"
          disabled={
            payments.estimate.loading || payments.estimate.debouncing || payments.estimate.error
          }
        >
          <Span>Pay</Span>
          <Span>
            {payments.estimate.loading || payments.estimate.debouncing
              ? [denominations && denominations[selectedDenomination].sign, <Loader />]
              : denominations &&
                denominations[selectedDenomination].toString({
                  omitDirection: true,
                }).total}
          </Span>
        </Submit>
      </Root>
    );
  }
}

PaymentConfirmation.propTypes = {};

PaymentConfirmation.defaultProps = {};

export default PaymentConfirmation;
