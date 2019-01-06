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
  Button,
  BalanceSummary,
  PaymentsGroup,
  Separator,
  BackButton,
  Support,
  PaymentDetails,
} from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const getSeparatorText = date => {
  let distance;
  distance = formatDate(new Date(date), 'Do MMMM');
  if (isToday(date)) {
    distance = 'Today';
  }
  if (isYesteray(date)) {
    distance = 'Yesterday';
  }
  return distance;
};

// eslint-disable-next-line
const Payment = ({ history, payments, t }) => {
  if (payments.getById.error || (!payments.getById.data && !payments.getById.loading)) {
    return (
      <Root>
        <Header>
          <BackButton />
          <P>Payment details</P>
          <Support className="openIntercom" />
        </Header>
        <EmptyWrapper>
          <ErrorIcon />
          <P>Unable to load details :(</P>
          <P>Try again later</P>
        </EmptyWrapper>
      </Root>
    );
  }

  if (payments.getById.loading && !payments.getById.data) {
    return (
      <Root>
        <Header>
          <BackButton />
          <P>Payment details</P>
          <Support className="openIntercom" />
        </Header>
        <EmptyWrapper>
          <EmptyIcon />
          <P>Loading details</P>
        </EmptyWrapper>
      </Root>
    );
  }

  return (
    <Root>
      <Header>
        <BackButton />
        <P>Payment details</P>
        <Support className="openIntercom" />
      </Header>
      <PaymentDetails {...payments.getById.data[0]} />
    </Root>
  );
};

export default Payment;
