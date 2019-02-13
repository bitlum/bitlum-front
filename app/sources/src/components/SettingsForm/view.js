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

import { Root, SettingsItem, P, Button, Span, Select } from './styles';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const SettingsForm = ({ className, settings, accounts, denominations, t }) => {
  const denominationsAvailable = Object.keys(denominations.get.data.BTC)
    .map(
      denomination =>
        !denomination.match(/(main|additional)/) && {
          value: denomination,
          label: denominations.get.data.BTC[denomination].sign,
        },
    )
    .filter(denomination => denomination);

  return (
    <Root className={className}>
      <SettingsItem>
        <Span>Main currency</Span>
        <Select
          options={denominationsAvailable}
          hideSelectedOptions
          isSearchable={false}
          isClearable={false}
          value={denominationsAvailable.filter(
            denomination => denomination.value === settings.get.data.denominations_BTC_main,
          )}
          onChange={data => {
            settings.set.run({ denominations_BTC_main: data.value });
          }}
        />
      </SettingsItem>
      <SettingsItem>
        <Span>Alternative currency</Span>
        <Select
          options={denominationsAvailable}
          hideSelectedOptions
          isSearchable={false}
          isClearable={false}
          value={denominationsAvailable.filter(
            denomination => denomination.value === settings.get.data.denominations_BTC_additional,
          )}
          onChange={data => {
            settings.set.run({ denominations_BTC_additional: data.value });
          }}
        />
      </SettingsItem>
      {settings.get.data.content_script_permissions !== 'granted' && (
        <SettingsItem
          onClick={() => {
            window.chrome.permissions.request(
              {
                permissions: ['tabs'],
                origins: ['<all_urls>'],
              },
              granted => {
                settings.set.run({ content_script_permissions: granted ? 'granted' : 'denied' });
              },
            );
          }}
        >
          <Button link>Automate copy-paste of invoices</Button>
        </SettingsItem>
      )}
      <SettingsItem
        onClick={() => {
          accounts.authenticate.cleanup('all');
        }}
      >
        <Button link>Log out</Button>
      </SettingsItem>
    </Root>
  );
};

SettingsForm.propTypes = {};

SettingsForm.defaultProps = {};

export default SettingsForm;
