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
  Message,
  PayButton,
  Img,
  Span,
  Permissions,
  A,
  CloseIcon,
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
          {/* <Img src={newPaymentIcon} /> */}
          <Span>{totalBalance === 0 ? 'Receive funds' : 'Pay'}</Span>
        </PayButton>
        <Message type="error">
          <P>Unable to load payments :(</P>
          <P>Try again later</P>
        </Message>
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
          {/* <Img src={newPaymentIcon} /> */}
          <Span>{totalBalance === 0 ? 'Receive funds' : 'Pay'}</Span>
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
          {/* <Img src={newPaymentIcon} /> */}
          <Span>{totalBalance === 0 ? 'Receive funds' : 'Pay'}</Span>
        </PayButton>
        <EmptyWrapper>
          <P>No payments made yet</P>
          <P>
            <NavLink to="/payments/receive/check">
              <Button link>Go receive one!</Button>
            </NavLink>
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
    if (
      !paymentsGrouped[`${dayOfPayment}_${payment.vuid}_${payment.vendorName}_${payment.status}`]
    ) {
      paymentsGrouped[`${dayOfPayment}_${payment.vuid}_${payment.vendorName}_${payment.status}`] = [
        payment,
      ];
    } else {
      paymentsGrouped[
        `${dayOfPayment}_${payment.vuid}_${payment.vendorName}_${payment.status}`
      ].push(payment);
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
      {settings.get.data && !(settings.get.data.content_script_permissions || '').match(/(granted|skipped)/) ? (
        <Permissions>
          {`Do not want to copy-paste addresses\nmanually on every payment?`}
          <Button
            primary
            onClick={() => {
              window.chrome.permissions.request(
                {
                  permissions: ['tabs'],
                  origins: ['<all_urls>'],
                },
                granted => {
                  settings.set.run('content_script_permissions', granted ? 'granted' : 'denied');
                },
              );
            }}
          >
            Automate copy-paste
          </Button>
          <P>
            {`After you grant permissions wallet will be able to open confirmation window when you click on website pay button.`}
            {/* {`We do not track any personal data. To prove this we will open source our wallet in coming month so you will be able to check how we work internally on GitHub`}{' '} */}
            {/* <A
            onClick={() => {
              window.open('https://github.com/bitlum/bitlum-front', '_blank');
            }}
          >
            <Span>check how we work internally on GitHub</Span>
          </A> */}
          </P>
          <CloseIcon
            onClick={() => {
              settings.set.run('content_script_permissions', 'skipped');
            }}
          />
        </Permissions>
      ) : null}
      <BalanceSummary key="BalanceSummary" accounts={accounts} />
      {/* <HeaderSecondary>Payments</HeaderSecondary> */}
      <PayButton to={totalBalance === 0 ? '/payments/receive/check' : '/payments/check'}>
        {/* <Img src={newPaymentIcon} /> */}
        <Span>{totalBalance === 0 ? 'Receive funds' : 'Pay'}</Span>
      </PayButton>
      {/* <Legend>
        <LegendItem type="pending">Pending</LegendItem>
        <LegendItem type="completed">Completed</LegendItem>
        <LegendItem type="failed">Failed</LegendItem>
      </Legend> */}
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

          if (index === 0 && currentGroupDate.getFullYear() === 9999) {
            result.unshift(<Separator key={currentGroupDate}>Pending</Separator>);
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
