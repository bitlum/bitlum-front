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

import view from './view';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

class Wrapper extends React.Component {
  async componentDidMount() {
    const { payments, denominations } = this.props;
    const query = window.location.hash.match(/\?(.*)/);

    let receive;
    if (query) {
      receive = new URLSearchParams(query[0]).get('receive');
      try {
        receive = JSON.parse(receive);
      } catch (error) {
        log.error(error);
        receive = undefined;
      }
    }
    if (receive.type.match('blockchain')) {
      payments.receive.run(receive.type, null, receive.asset);
    }

    denominations.get.run();
  }

  componentWillUnmount() {
    const { payments } = this.props;
    payments.receive.cleanup('all');
  }

  render() {
    const query = window.location.hash.match(/\?(.*)/);

    let receive;
    if (query) {
      receive = new URLSearchParams(query[0]).get('receive');
      try {
        receive = JSON.parse(receive);
      } catch (error) {
        log.error(error);
        receive = undefined;
      }
    }
    return React.createElement(observer(view), { ...this.props, receive });
  }
}

Wrapper.propTypes = {};

export default inject('payments', 'denominations')(observer(Wrapper));
