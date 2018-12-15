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

import PaymentDetails from 'components/PaymentDetails';

import {
  Root,
  EmptyIcon,
  P,
  Header,
  Button,
  BalanceSummary,
  PaymentsGroup,
  Separator,
  BackButton,
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
        </Header>
        {t('components.Payment.error')}
      </Root>
    );
  }

  if (payments.getById.loading && !payments.getById.data) {
    return (
      <Root>
        <Header>
          <BackButton />
          <P>Payment details</P>
        </Header>
        {t('components.Payment.loading')}
      </Root>
    );
  }

  return (
    <Root>
      <Header>
        <BackButton />
        <P>Payment details</P>
      </Header>
      <PaymentDetails {...payments.getById.data[0]} />
    </Root>
  );
};

export default Payment;
