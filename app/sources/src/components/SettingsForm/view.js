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

import { Root, SettingsItem, P, Img, Span } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const SettingsForm = ({ className, settings, t }) => {
  return (
    <Root className={className}>
      <SettingsItem
        onClick={() => {
          console.log('changed');
        }}
      >
        <Span>Main denomination</Span>
        <Span>{settings.get.data.denominations.BTC.main.sign}</Span>
      </SettingsItem>
      <SettingsItem
        onClick={() => {
          console.log('changed');
        }}
      >
        <Span>Recieve with alt-coins</Span>
        <Span>ON</Span>
      </SettingsItem>
    </Root>
  );
};

SettingsForm.propTypes = {};

SettingsForm.defaultProps = {};

export default SettingsForm;
