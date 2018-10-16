/**
 * Send scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import GA from 'utils/GA';
import IC from 'utils/IC';

import SendPayment from 'components/SendPayment';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Account = () => {
  // GA({ type: 'pageview', page: '/' });
  // if (payments.get.loading && (!payments.get.data || payments.get.data.length === 0)) {
  //   return (
  //     <div className={`${styles.root} ${styles.loading}`}>
  //       <div className={styles.loader} />
  //       {t('components.Payment.loading')}
  //     </div>
  //   );
  // }

  return <SendPayment />;
};

export default Account;
