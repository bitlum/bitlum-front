/**
 * Data fetching and final component export
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';

import logger from 'utils/logging';

import view from './view';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Wrapper = props => {
  const { payments, denominations } = props;

  useEffect(() => {
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

    const polling = setInterval(() => {
      payments.get.run();
    }, 3000);

    return () => {
      clearInterval(polling);
      payments.receive.cleanup('all');
    };
  });

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

  return React.createElement(observer(view), { ...props, receive, nopopup: new URLSearchParams(query[0]).get('nopopup') });
};

Wrapper.propTypes = {};

export default inject('payments', 'denominations')(Wrapper);
