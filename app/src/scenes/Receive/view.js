/**
 * Receive scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import { Root, Header, ReceivePayment, P, BackButton } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Receive = () => (
  <Root>
    <Header>
      <BackButton />
      <P>Receive</P>
    </Header>
    <ReceivePayment />
  </Root>
);

export default Receive;
