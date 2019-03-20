/**
 * Send scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import logger from 'utils/logging';

import { Root, Header, BackButton, P, PaymentConfirmation, Support } from './styles';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Confirm = ({ payments, vendors, payment, accounts, info }) => {
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
          info={info}
        />
      ) : (
        <P>No payment provided to confirm</P>
      )}
    </Root>
  );
};

export default Confirm;
