/**
 * Authentication scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

import GA from 'utils/GA';
import IC from 'utils/IC';

import AuthenticationWidget from 'components/AuthenticationWidget';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

// eslint-disable-next-line
const Auth = () => {
  // GA({ type: 'pageview', page: '/' });
  // if (payments.get.loading && (!payments.get.data || payments.get.data.length === 0)) {
  //   return (
  //     <div className={`${styles.root} ${styles.loading}`}>
  //       <div className={styles.loader} />
  //       {t('components.Payment.loading')}
  //     </div>
  //   );
  // }

  return (
    <AuthenticationWidget />
  );
};

export default Auth;
