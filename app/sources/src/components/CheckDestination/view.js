/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GA from 'utils/GA';
import logger from 'utils/logging';

import { Root, Input, Button, Message, P, Span, A, DestinationInfo, AmountInput } from './styles';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export class CheckDestination extends Component {
  componentWillUnmount() {
    const { wallets } = this.props;
    wallets.getDetails.cleanup('all');
  }

  render() {
    const { wallets, wallet, className, history, t, accounts } = this.props;

    if (
      wallets.getDetails.data &&
      !(wallets.getDetails.data.latestPayment && wallets.getDetails.data.type === 'lightning')
    ) {
      history.push(
        `/payments/confirm?payment=${JSON.stringify({ ...wallet, ...wallets.getDetails.data })}`,
      );
      return null;
    }

    return (
      <Root className={className} loading={wallets.getDetails.loading}>
        <P>Destination</P>

        <Input
          autoFocus
          id="sendAddress"
          type="text"
          placeholder="Paste lightning invoice or bitcoin address"
          labelValid="Destination"
          labelInvalid="Destination invalid"
          onChange={e => {
            wallets.getDetails.run(e.target.value, 'BTC');
          }}
          required
        />
        {wallets.getDetails.error && (
          <Message type="error">
            {t([`errors.${wallets.getDetails.error.code}`, 'errors.default'])}
          </Message>
        )}
        {wallets.getDetails.data &&
          wallets.getDetails.data.latestPayment &&
          wallets.getDetails.data.type === 'lightning' && (
            <Message type="info">
              {' '}
              This invoice is already paid{' '}
              {accounts.get.data &&
              accounts.get.data.auid === wallets.getDetails.data.latestPayment.auid ? (
                <Span
                  onClick={() => {
                    history.push(`/payments/${wallets.getDetails.data.latestPayment.puid}`);
                  }}
                >
                  Go to payment details
                </Span>
              ) : (
                ' by someone else'
              )}
            </Message>
          )}
        <A
          href="https://zigzag.io?utm_source=integration&utm_medium=bitlumwallet&utm_campaign=withdrawLink"
          target="_blank"
        >
          Withdraw here to other assets in 5 seconds
        </A>
        <P>
          <Span>Do not known where to pay using Lightning Network?</Span>
          <Span>Don’t worry! We have prepared list of services for you on yalls.org 😉</Span>
          <A
            target="_blank"
            href="https://yalls.org/articles/97d67df1-d721-417d-a6c0-11d793739be9:0965AC5E-56CD-4870-9041-E69616660E6F/bce2eae0-802c-40f9-b119-02b4b150a4ce"
          >
            Try it out!
          </A>
        </P>
      </Root>
    );
  }
}

CheckDestination.propTypes = {};

CheckDestination.defaultProps = {};

export default CheckDestination;
