/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import log from 'utils/logging';

import { Root, AssetItem, P, Img, Span } from './styles';

import iconOnchain from 'assets/icons/assets/btc.svg';
import iconOffchain from 'assets/icons/assets/lightning.svg';
import iconAltcoins from 'assets/icons/assets/altcoins.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const SelectReceiveAsset = ({ className, history, t }) => {
  return (
    <Root className={className}>
      <AssetItem
        onClick={() => {
          history.push(
            `/payments/receive/confirm?receive=${JSON.stringify({
              type: 'lightning',
              asset: 'BTC',
            })}`,
          );
        }}
      >
        <Img src={iconOffchain} />
        <P>
          <Span>Lightning Network Bitcoin</Span>
          <Span>Fastest, and cheapest way to deposit Bitcoin</Span>
        </P>
      </AssetItem>
      <AssetItem
        onClick={() => {
          history.push(
            `/payments/receive/confirm?receive=${JSON.stringify({
              type: 'blockchain',
              asset: 'BTC',
            })}`,
          );
        }}
      >
        <Img src={iconOnchain} />
        <P>
          <Span>On-chain Bitcoin</Span>
          <Span>
            Send on-chain Bitcoin payent directly to wallet
          </Span>
        </P>
      </AssetItem>
      <AssetItem className="openIntercom">
        <Img src={iconAltcoins} />
        <P>
          <Span>Want to receive altcoins?</Span>
          <Span>
            Write us which altcoin you want!
          </Span>
        </P>
      </AssetItem>
    </Root>
  );
};

SelectReceiveAsset.propTypes = {};

SelectReceiveAsset.defaultProps = {};

export default SelectReceiveAsset;
