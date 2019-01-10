/**
 * Data fetching and final component export
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import { observer, inject } from 'mobx-react';

import log from 'utils/logging';

import view from './view';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

class Wrapper extends React.Component {
  async componentDidMount() {
    const { vendors, accounts, payments } = this.props;
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

    vendors.get.run(payment.vuid, { origin: payment.origin });

    if (!accounts.get.data) {
      accounts.get.run();
    }

    this.polling = setInterval(() => {
      accounts.get.run();
    }, 5000);
  }

  componentWillUnmount() {
    const { vendors } = this.props;
    vendors.get.cleanup();
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
    return React.createElement(observer(view), { ...this.props, payment });
  }
}

Wrapper.propTypes = {};

export default inject('payments', 'vendors', 'accounts', 'settings', 'wallets')(observer(Wrapper));
