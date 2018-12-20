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

const Receive = () => (
  <Root>
    <Header>
      <BackButton />
      <P>Receive</P>
      <Support className="openIntercom" />
    </Header>
    <ReceivePayment />
  </Root>
);

export default Receive;
