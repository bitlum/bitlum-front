/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import logger from 'utils/logging';
const log = logger();

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
        <Span>{settings.get.data.denominations_BTC_main}</Span>
      </SettingsItem>
      <SettingsItem
        onClick={() => {
          settings.set.run({ denominations_BTC_main: 'SAT' });
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
