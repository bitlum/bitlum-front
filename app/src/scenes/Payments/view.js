/**
 * Payments scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';

import GA from 'utils/GA';
import IC from 'utils/IC';

import PaymentItem from 'components/PaymentItem';

import { Root } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

// eslint-disable-next-line
const Payments = ({ payments }) => {
  // GA({ type: 'pageview', page: '/' });
  // if (payments.get.loading && (!payments.get.data || payments.get.data.length === 0)) {
  //   return (
  //     <div className={`${styles.root} ${styles.loading}`}>
  //       <div className={styles.loader} />
  //       {t('components.Payment.loading')}
  //     </div>
  //   );
  // }

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
