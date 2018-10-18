/**
 * Payments scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import PaymentItem from 'components/PaymentItem';

import { Root } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

// eslint-disable-next-line
const Payments = ({ payments ,t }) => {
  if (payments.get.error) {
    return <Root>{t('components.Payment.error')}</Root>;
  }
  return (
    <Root>
      {payments.get.data &&
        payments.get.data.map(payment => (
          <PaymentItem key={payment.puid} {...payment} fee={payment.fees.total} />
        ))}
    </Root>
  );
};

export default Payments;
