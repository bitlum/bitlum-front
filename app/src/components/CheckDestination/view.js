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

import { Root, Input, Button, Message, P, Span, DestinationInfo, AmountInput } from './styles';

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

    if (wallets.getDetails.data) {
      GA({
        type: 'event',
        category: 'vuidDomainPair',
        action: `${wallet.origin || 'manual'}_${wallets.getDetails.data}`,
      });
      history.push(`/payments/confirm?payment=${JSON.stringify(wallets.getDetails.data)}`);
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
      </Root>
    );
  }
}

CheckDestination.propTypes = {};

CheckDestination.defaultProps = {};

export default CheckDestination;
