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
    const { wallets } = this.props;
    const query = window.location.hash.match(/\?(.*)/);

    let wallet;
    if (query) {
      wallet = new URLSearchParams(query[0]).get('wallet');
      try {
        wallet = JSON.parse(wallet);
      } catch (error) {
        log.error(error);
        wallet = undefined;
      }
    }
    if (wallet) {
      GA({
        type: 'event',
        category: 'lnDomains',
        action: 'clickOnButton',
        label: wallet.origin || 'manual',
      });
      wallets.getDetails.run(wallet.wuid, wallet.asset);
    }
  }

  componentWillUnmount() {
    const { wallets } = this.props;
    wallets.getDetails.cleanup('all');
    clearInterval(this.polling);
  }

  render() {
    const query = window.location.hash.match(/\?(.*)/);
    let wallet;
    if (query) {
      wallet = new URLSearchParams(query[0]).get('wallet');
      try {
        wallet = JSON.parse(wallet);
      } catch (error) {
        log.error(error);
        wallet = undefined;
      }
    }
    return React.createElement(observer(view), { ...this.props, wallet });
  }
}

Wrapper.propTypes = {};

export default inject('payments', 'wallets', 'accounts')(observer(Wrapper));
