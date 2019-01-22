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

const Receive = ({ payments, receive }) => (
  <Root>
    <Header>
      <BackButton />
      <P>Receive</P>
      <Support className="openIntercom" />
    </Header>
    <ReceivePayment payments={payments} receive={receive} />
  </Root>
);

export default Receive;
