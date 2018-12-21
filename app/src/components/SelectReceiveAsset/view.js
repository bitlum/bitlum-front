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

import { Root, AssetItem, P } from './styles';

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
        <P>Lightning Network Bitcoin</P>
        <P>Fastest, and cheapest way to deposit Bitcoin</P>
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
        <P>On-chain Bitcoin</P>
        <P>Send on-chain Bitcoin payent directly to wallet without additional service commision</P>
      </AssetItem>
    </Root>
  );
};

SelectReceiveAsset.propTypes = {};

SelectReceiveAsset.defaultProps = {};

export default SelectReceiveAsset;
