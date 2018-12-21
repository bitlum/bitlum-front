/**
 * Receive scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import { Root, Header, SelectReceiveAsset, P, BackButton, Support, Message } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Receive = ({ payments }) => (
  <Root loading={payments.receive.loading}>
    <Header>
      <BackButton />
      <P>Receive</P>
      <Support className="openIntercom" />
    </Header>
    {payments.receive.error ? <Message type="error">{payments.receive.error.message}</Message> : null}
    <SelectReceiveAsset disabled={payments.receive.error} />
  </Root>
);

export default Receive;
