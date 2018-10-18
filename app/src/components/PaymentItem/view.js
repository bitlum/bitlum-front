/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';

import log from 'utils/logging';

import { Root, Span, Amount, Time, Info, Status, Address } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const Payment = ({
  amount,
  direction,
  from,
  to,
  asset,
  type,
  status,
  createdAt,
  txid,
  fee,
  t,
}) => (
  <Root>
    <Info>
      <Time>
        {distanceInWordsStrict(new Date(), new Date(Number(createdAt)), {
          addSuffix: true,
          includeSeconds: true,
        })}
      </Time>
      <Status status={status}>{status}</Status>
    </Info>
    <Info>
      <Amount direction={direction}>
        {Math.floor(amount * 10 ** 8) / 10 ** 8} {asset}
      </Amount>
      <Span>{type}</Span>
      <Span>
        Fee: {Math.floor(fee * 10 ** 8) / 10 ** 8} {asset}
      </Span>
    </Info>
    <Info>
      <Address>{direction === 'outgoing' ? `To: ${to}` : `From:${from}`}</Address>
      <Span>
        {type === 'lightning' ? 'Payment hash' : 'TXID'}: {txid}
      </Span>
    </Info>
  </Root>
);

Payment.propTypes = {};

Payment.defaultProps = {};

export default Payment;
