/**
 * Send scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import log from 'utils/logging';

import { Root, Header, BackButton, P, SendPayment } from './styles';

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
  return (
    <Root>
      <Header>
        <BackButton />
        <P>Pay</P>
      </Header>
      <SendPayment prefill={prefill} />
    </Root>
  );
};

export default Send;
