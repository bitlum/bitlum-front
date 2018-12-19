/**
 * Send scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import log from 'utils/logging';

import { Root, Header, BackButton, P, CheckDestination } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Send = ({ wallets, wallet }) => {
  return (
    <Root>
      <Header>
        <BackButton />
        <P>Pay</P>
      </Header>
      <CheckDestination wallets={wallets} wallet={wallet} />
    </Root>
  );
};

export default Send;
