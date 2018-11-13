/**
 * Send scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import log from 'utils/logging';

import { SendPayment } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Send = () => {
  let prefill = new URLSearchParams(window.location.search).get('payment');
  try {
    prefill = JSON.parse(prefill);
  } catch (error) {
    log.error(error);
    prefill = undefined;
  }
  return <SendPayment prefill={prefill} />;
};

export default Send;
