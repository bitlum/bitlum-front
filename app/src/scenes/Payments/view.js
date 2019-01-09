/**
 * Payments scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import { List } from 'react-virtualized';
import { NavLink } from 'react-router-dom';
import formatDate from 'date-fns/format';
import isSameDay from 'date-fns/is_same_day';
import isToday from 'date-fns/is_today';
import isYesteray from 'date-fns/is_yesterday';

import {
  Root,
  EmptyIcon,
  ErrorIcon,
  EmptyWrapper,
  LogOut,
  P,
  Support,
  Header,
  Button,
  BalanceSummary,
  PaymentsGroup,
  Separator,
  HeaderSecondary,
  Logo,
  Legend,
  LegendItem,
  PayButton,
  Img,
  Span,
} from './styles';

import newPaymentIcon from 'assets/icons/plus-circle.svg';
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
const Payments = ({ settings, payments, accounts, t }) => {
  const totalBalance =
    accounts.get.data &&
    Object.keys(accounts.get.data.balances)
      .map(asset => accounts.get.data.balances[asset].available)
      .reduce((p, c) => p + Number(c), 0);

  if (payments.get.error) {
    return (
      <Root empty>
        <Header>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <LogOut
            onClick={() => {
              accounts.authenticate.cleanup();
            }}
          />
          <Support className="openIntercom" />
        </Header>
        <BalanceSummary key="BalanceSummary" accounts={accounts} />
        {/* <HeaderSecondary>Payments</HeaderSecondary> */}
        <PayButton to={totalBalance === 0 ? '/payments/receive/check' : '/payments/check'}>
          <Img src={newPaymentIcon} />
          <Span>{totalBalance === 0 ? 'Receive funds' : 'Make new payment'}</Span>
        </PayButton>
        <EmptyWrapper>
          <EmptyIcon />
          <P>Unable to load payments :(</P>
          <P>Try again later</P>
        </EmptyWrapper>
      </Root>
    );
  }

  if (payments.get.loading && !payments.get.data) {
    return (
      <Root empty loading>
        <Header>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <LogOut
            onClick={() => {
              accounts.authenticate.cleanup();
            }}
          />
          <Support className="openIntercom" />
        </Header>
        <BalanceSummary key="BalanceSummary" accounts={accounts} />
        {/* <HeaderSecondary>Payments</HeaderSecondary> */}
        <PayButton to={totalBalance === 0 ? '/payments/receive/check' : '/payments/check'}>
          <Img src={newPaymentIcon} />
          <Span>{totalBalance === 0 ? 'Receive funds' : 'Make new payment'}</Span>
        </PayButton>
        <EmptyWrapper>
          <EmptyIcon />
          <P>Loading payments</P>
        </EmptyWrapper>
      </Root>
    );
  }

  if ((!payments.get.data && !payments.get.loading) || payments.get.data.length === 0) {
    return (
      <Root empty>
        <Header>
          <NavLink to="/">
            <Logo />
          </NavLink>
          <LogOut
            onClick={() => {
              accounts.authenticate.cleanup();
            }}
          />
          <Support className="openIntercom" />
        </Header>
        <BalanceSummary key="BalanceSummary" accounts={accounts} />
        {/* <HeaderSecondary>Payments</HeaderSecondary> */}
        <PayButton to={totalBalance === 0 ? '/payments/receive/check' : '/payments/check'}>
          <Img src={newPaymentIcon} />
          <Span>{totalBalance === 0 ? 'Receive funds' : 'Make new payment'}</Span>
        </PayButton>
        <EmptyWrapper>
          <EmptyIcon />
          <P>No payments here yet</P>
          <P>
            Go{' '}
            <NavLink to="/payments/receive/check">
              <Button link>receive</Button>
            </NavLink>{' '}
            one! :)
          </P>
        </EmptyWrapper>
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
      <Header>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <LogOut
          onClick={() => {
            accounts.authenticate.cleanup();
          }}
        />
        <Support className="openIntercom" />
      </Header>
      <BalanceSummary key="BalanceSummary" accounts={accounts} />
      {/* <HeaderSecondary>Payments</HeaderSecondary> */}
      <PayButton to={totalBalance === 0 ? '/payments/receive/check' : '/payments/check'}>
        <Img src={newPaymentIcon} />
        <Span>{totalBalance === 0 ? 'Receive funds' : 'Make new payment'}</Span>
      </PayButton>
      <Legend>
        <LegendItem type="pending">Pending</LegendItem>
        <LegendItem type="completed">Completed</LegendItem>
        <LegendItem type="failed">Failed</LegendItem>
      </Legend>
      {Object.entries(paymentsGrouped)
        .sort((p, c) => c[0].split('_')[0] - p[0].split('_')[0])
        .map((paymentsGroup, index, self) => {
          const result = [
            <PaymentsGroup
              key={paymentsGroup[0]}
              status={paymentsGroup[1][0].status}
              vendorName={paymentsGroup[1][0].vendorName}
              vendorIcon={paymentsGroup[1][0].vendorIcon}
              vendorColor={paymentsGroup[1][0].vendorColor}
              payments={paymentsGroup[1]}
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
        })}
    </Root>
  );
};

export default Payments;
