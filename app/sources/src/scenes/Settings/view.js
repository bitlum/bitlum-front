/**
 * Payments scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import formatDate from 'date-fns/format';
import isSameDay from 'date-fns/is_same_day';
import isToday from 'date-fns/is_today';
import isYesteray from 'date-fns/is_yesterday';

import {
  Root,
  EmptyIcon,
  ErrorIcon,
  EmptyWrapper,
  P,
  Header,
  SettingsForm,
  BackButton,
  Support,
} from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

// eslint-disable-next-line
const SettingsScene = ({ history, settings, t }) => {
  if (settings.get.error || (!settings.get.data && !settings.get.loading)) {
    return (
      <Root>
        <Header>
          <BackButton />
          <P>Settings</P>
          <Support className="openIntercom" />
        </Header>
        <EmptyWrapper>
          <ErrorIcon />
          <P>Unable to load settings :(</P>
          <P>Try again later</P>
        </EmptyWrapper>
      </Root>
    );
  }

  if (settings.get.loading && !settings.get.data) {
    return (
      <Root>
        <Header>
          <BackButton />
          <P>Settings</P>
          <Support className="openIntercom" />
        </Header>
        <EmptyWrapper>
          <EmptyIcon />
          <P>Loading settings</P>
        </EmptyWrapper>
      </Root>
    );
  }

  return (
    <Root>
      <Header>
        <BackButton />
        <P>Settings</P>
        <Support className="openIntercom" />
      </Header>
      <SettingsForm {...settings.get.data} />
    </Root>
  );
};

export default SettingsScene;
