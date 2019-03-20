/**
 * Data fetching and final component export
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import { observer, inject } from 'mobx-react';

import logger from 'utils/logging';

import GA from 'utils/GA';

import view from './view';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

class Wrapper extends React.Component {
  async componentDidMount() {
    const { vendors, accounts, info } = this.props;
    const query = window.location.hash.match(/\?(.*)/);

    let payment;
    if (query) {
      payment = new URLSearchParams(query[0]).get('payment');
      try {
        payment = JSON.parse(payment);
      } catch (error) {
        log.error(error);
        payment = undefined;
      }
    }
    if (!payment.origin) {
      try {
        const clipboardPayment = JSON.parse(localStorage.getItem('latestCopiedWuid'));
        if (clipboardPayment.wuid === payment.wuid) {
          payment.origin = clipboardPayment.origin;
        }
      } catch (e) {
        console.log(e);
      }
      GA({
        type: 'event',
        category: 'payment',
        action: 'insertedManually',
        label: payment.origin || 'unknown',
      });
    } else {
      GA({
        type: 'event',
        category: 'payment',
        action: 'insertedAutomatically_button',
        label: payment.origin,
      });
    }

    GA({
      type: 'event',
      category: 'vuidDomainPair',
      action: `${payment.origin || 'unknown'}_${payment.vuid}`,
    });

    vendors.get.run(payment.vuid, { origin: payment.origin });
    accounts.get.run();
    info.get.run();

    this.polling = setInterval(() => {
      accounts.get.run();
      info.get.run();
    }, 5000);
  }

  componentWillUnmount() {
    const { vendors } = this.props;
    vendors.get.cleanup('all');
    clearInterval(this.polling);
  }

  render() {
    const query = window.location.hash.match(/\?(.*)/);
    let payment;
    if (query) {
      payment = new URLSearchParams(query[0]).get('payment');
      try {
        payment = JSON.parse(payment);
      } catch (error) {
        log.error(error);
        payment = undefined;
      }
    }
    if (!payment.origin) {
      try {
        const clipboardPayment = JSON.parse(localStorage.getItem('latestCopiedWuid'));
        if (clipboardPayment.wuid === payment.wuid) {
          payment.origin = clipboardPayment.origin;
        }
      } catch (e) {
        console.log(e);
      }
    }
    return React.createElement(observer(view), { ...this.props, payment });
  }
}

Wrapper.propTypes = {};

export default inject('payments', 'vendors', 'accounts', 'info')(observer(Wrapper));
