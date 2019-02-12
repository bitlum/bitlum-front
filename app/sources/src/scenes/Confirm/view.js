/**
 * Send scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import logger from 'utils/logging';
const log = logger();

import { Root, Header, BackButton, P, PaymentConfirmation, Support } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Confirm = ({ payments, vendors, payment, accounts }) => {
  return (
    <Root>
      <Header>
        <BackButton />
        <P>Pay</P>
        <Support className="openIntercom" />
      </Header>
      {payment ? (
        <PaymentConfirmation
          payment={payment}
          payments={payments}
          vendors={vendors}
          accounts={accounts}
        />
      ) : (
        <P>No payment provided to confirm</P>
      )}
    </Root>
  );
};

export default Confirm;
