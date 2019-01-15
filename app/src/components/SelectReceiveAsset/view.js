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
          <Span>Receive with lightning faster than other methods and takes less fees</Span>
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
          <Span>Receive with on-chain / regular Bitcoin payment will take about ~10 minutes to confirm</Span>
        </P>
      </AssetItem>
      <AssetItem
        onClick={() => {
          window.open('https://zigzag.io', '_blank');
        }}
      >
        <Img src={iconAltcoins} />
        <P>
          <Span>Recieve with alt-coins</Span>
          <Span>
            Receive with alt-coin implies conversion of alt-coin to Bitcoin with fee using
            zigzag.io service
          </Span>
        </P>
      </AssetItem>
    </Root>
  );
};

SelectReceiveAsset.propTypes = {};

SelectReceiveAsset.defaultProps = {};

export default SelectReceiveAsset;
