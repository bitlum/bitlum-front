/**
 * Receive scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import { Root, Header, ReceivePayment, P, BackButton, Support } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Receive = ({ payments, receive, denominations, nopopup }) => (
  <Root>
    <Header>
      <BackButton hidden={nopopup} />
      <P>{nopopup ? 'Withdraw' : 'Receive'}</P>
      <Support className="openIntercom" />
    </Header>
    <ReceivePayment
      payments={payments}
      receive={receive}
      nopopup={nopopup}
      denominations={denominations}
    />
  </Root>
);

export default Receive;
