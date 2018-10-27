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

import AssetChip from 'components/AssetChip';

import { Root, Span, Amount, Info, Status, Address, Button } from './styles';

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
      <AssetChip asset="BTC" type={type} onlyIcon />
    </Info>
    {direction === 'outgoing' ? (
      <Info>
        <Span>Sent</Span>
        <Span>
          {distanceInWordsStrict(new Date(), new Date(Number(createdAt)), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </Span>
      </Info>
    ) : (
      <Info>
        <Span>Received</Span>
        <Span>
          {distanceInWordsStrict(new Date(), new Date(Number(createdAt)), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </Span>
      </Info>
    )}
    <Info>
      <Amount direction={direction}>
        {Math.floor(amount * 10 ** 8) / 10 ** 8} {asset}
      </Amount>

      {status !== 'completed' ? <Status status={status}>{status}</Status> : null}
      {fee !== 0 ? (
        <Span>
          Fee: {Math.floor(fee * 10 ** 8) / 10 ** 8} {asset}
        </Span>
      ) : null}
    </Info>
    <Info>
    {/* {direction === 'incoming' ? <Span>To</Span> : null} */}
      {type === 'blockchain' ? (
        <Span>
          <Button
            as="a"
            href={`https://chain.so/tx/BTC${
              window.location.hostname.includes('testnet') ? 'TEST' : ''
            }/${txid}`}
            target="_blank"
            link
            external
          >
            Open transaction in explorer
          </Button>
        </Span>
      ) : direction === 'outgoing' ? (
        <Address>{to}</Address>
      ) : (
        <Address>{from}</Address>
      )}
    </Info>
  </Root>
);

Payment.propTypes = {};

Payment.defaultProps = {};

export default Payment;
