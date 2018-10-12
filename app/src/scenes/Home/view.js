/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import { MemoryRouter as Router, Route, NavLink } from 'react-router-dom';

import GA from 'utils/GA';
import IC from 'utils/IC';
import getNet from 'utils/cryptonetChecker';

import PaymentItem from 'components/PaymentItem';
import SendPayment from 'components/SendPayment';
import ReceivePayment from 'components/ReceivePayment';
import AuthenticationWidget from 'components/AuthenticationWidget';
import AccountInfo from 'components/AccountInfo';

import styles from './index.module.css';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

// eslint-disable-next-line
const Home = ({ payments, accounts }) => {
  // GA({ type: 'pageview', page: '/' });
  if (payments.get.loading && (!payments.get.data || payments.get.data.length === 0)) {
    return (
      <div className={`${styles.root} ${styles.loading}`}>
        <div className={styles.loader} />
        {t('components.Payment.loading')}
      </div>
    );
  }
  if (payments.get.error || !accounts.authenticate.data || Object.keys(accounts.authenticate.data).length === 0) {
    if (payments.get.error && payments.get.error.code.match('^401')) {
      return <AuthenticationWidget />;
    }
    if (!accounts.authenticate.isAuthorized || Object.keys(accounts.authenticate.data).length === 0) {
      return <AuthenticationWidget />;
    }
    return <div className={`${styles.root} ${styles.error}`}>{t('components.Payment.error')}</div>;
  }
  return (
    <div className={styles.root}>
      <div>
        <div style={{ display: 'flex' }}>
          <SendPayment />
          <ReceivePayment />
        </div>
        <div style={{ display: 'flex' }}>
          <div className={styles.paymentList}>
            {payments.get.data &&
              payments.get.data.map(payment => (
                <PaymentItem key={payment.puid} {...payment} fee={payment.fees.total} />
              ))}
          </div>
          <AccountInfo />
        </div>
      </div>
    </div>
  );
};

export default Home;
