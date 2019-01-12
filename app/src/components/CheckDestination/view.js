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
import log from 'utils/logging';

import { Root, Input, Button, Message, P, Span, A, DestinationInfo, AmountInput } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export class CheckDestination extends Component {
  componentWillUnmount() {
    const { wallets } = this.props;
    wallets.getDetails.cleanup();
  }

  render() {
    const { wallets, wallet, className, history, t } = this.props;

    if (
      wallets.getDetails.data &&
      !(wallets.getDetails.data.latestPayment && wallets.getDetails.data.type === 'lightning')
    ) {
      GA({
        type: 'event',
        category: 'vuidDomainPair',
        action: `${(wallet && wallet.origin) || 'manual'}_${wallets.getDetails.data}`,
      });
      history.push(
        `/payments/confirm?payment=${JSON.stringify({ ...wallet, ...wallets.getDetails.data })}`,
      );
      return null;
    }

    return (
      <Root className={className} loading={wallets.getDetails.loading}>
        <P>Destination</P>
        <Input
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
          <Message type="error"> {wallets.getDetails.error.message} </Message>
        )}
        {wallets.getDetails.data &&
          wallets.getDetails.data.latestPayment &&
          wallets.getDetails.data.type === 'lightning' && (
            <Message type="info">
              {' '}
              This invoice is already paid.{' '}
              <Span
                onClick={() => {
                  history.push(`/payments/${wallets.getDetails.data.latestPayment.puid}`);
                }}
              >
                Go to payment details
              </Span>{' '}
            </Message>
          )}
        <P>
          <Span>Want to try Lightning Network?</Span>
          <Span>You can easily do it on Yalls.org by paying for any article or emoji 😉</Span>
          <A target="_blank" href="https://yalls.org/articles/97d67df1-d721-417d-a6c0-11d793739be9:0965AC5E-56CD-4870-9041-E69616660E6F/a6bb346e-6616-437c-b1f8-e7be244f9645">
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
