/**
 * Payments scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import { NavLink } from 'react-router-dom';
import formatDate from 'date-fns/format';
import isSameDay from 'date-fns/is_same_day';
import isToday from 'date-fns/is_today';
import isYesteray from 'date-fns/is_yesterday';

import {
  Root,
  EmptyIcon,
  P,
  Header,
  Button,
  BalanceSummary,
  PaymentsGroup,
  Separator,
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
const Payments = ({ payments, t }) => {
  if (payments.get.error) {
    return <Root>{t('components.Payment.error')}</Root>;
  }

  if (payments.get.loading && !payments.get.data) {
    return <Root>{t('components.Payment.loading')}</Root>;
  }

  if ((!payments.get.data || payments.get.data.length === 0) && !payments.get.loading) {
    return (
      <Root empty>
        <BalanceSummary
          key="BalanceSummary"
          mainDenominationPrice="4000"
          mainDenominationSign="$"
          additionalDenominationPrice="1"
          additionalDenominationSign="BTC"
        />
        <Header>Payments</Header>
        <P>
          <EmptyIcon />
          <P>No payments here yet</P>
          <P>
            Go{' '}
            <NavLink to="/send">
              <Button link>send</Button>
            </NavLink>{' '}
            or{' '}
            <NavLink to="/receive">
              <Button link>receive</Button>
            </NavLink>{' '}
            one! :)
          </P>
        </P>
      </Root>
    );
  }

  const paymentsGrouped = {};
  payments.get.data.forEach(payment => {
    const dayOfPayment = new Date(
      payment.status === 'pending' ? '01-01-9999' : payment.updatedAt,
    ).setHours(0, 0, 0, 0);
    if (!paymentsGrouped[`${dayOfPayment}_${payment.vuid}_${payment.status}`]) {
      paymentsGrouped[`${dayOfPayment}_${payment.vuid}_${payment.status}`] = [payment];
    } else {
      paymentsGrouped[`${dayOfPayment}_${payment.vuid}_${payment.status}`].push(payment);
    }
  });

  return (
    <Root>
      <BalanceSummary
        key="BalanceSummary"
        mainDenominationPrice="4000"
        mainDenominationSign="USD"
        mainDenominationRound="2"
        additionalDenominationPrice="1"
        additionalDenominationSign="BTC"
        additionalDenominationRound="8"
      />
      <Header>Payments</Header>
      {Object.entries(paymentsGrouped)
        .map((paymentsGroup, index, self) => {
          const result = [
            <PaymentsGroup
              key={paymentsGroup[0]}
              status={paymentsGroup[1][0].status}
              vendorName={paymentsGroup[1][0].vendorName}
              vendorIcon={paymentsGroup[1][0].vendorIcon}
              payments={paymentsGroup[1]}
              mainDenominationPrice="4000"
              mainDenominationSign="USD"
              mainDenominationRound="2"
              additionalDenominationPrice="1"
              additionalDenominationSign="BTC"
              additionalDenominationRound="8"
            />,
          ];
          const currentGroupDate = new Date(Number(paymentsGroup[0].split('_')[0]));

          if (index === 0 && currentGroupDate.getFullYear() !== 9999) {
            result.unshift(
              <Separator key={currentGroupDate}>{getSeparatorText(currentGroupDate)}</Separator>,
            );
          }

          const nextGroupDate =
            self[index + 1] && new Date(Number(self[index + 1][0].split('_')[0]));

          if (nextGroupDate && !isSameDay(currentGroupDate, nextGroupDate)) {
            result.push(
              <Separator key={nextGroupDate}>{getSeparatorText(nextGroupDate)}</Separator>,
            );
          }

          return result;
        })
        .flat()}
    </Root>
  );
};

export default Payments;
