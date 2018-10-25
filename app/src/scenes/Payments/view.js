/**
 * Payments scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import { NavLink } from 'react-router-dom';

import PaymentItem from 'components/PaymentItem';

import { Root, EmptyIcon, P, Button } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

// eslint-disable-next-line
const Payments = ({ payments, t }) => {
  if (payments.get.error) {
    return <Root>{t('components.Payment.error')}</Root>;
  }

  if ((!payments.get.data || payments.get.data.length === 0) && !payments.get.loading) {
    return (
      <Root empty>
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
      </Root>
    );
  }
  return (
    <Root>
      {payments.get.data && payments.get.data.map(payment => (
        <PaymentItem key={payment.puid} {...payment} fee={payment.fees.total} />
      ))}
    </Root>
  );
};

export default Payments;
