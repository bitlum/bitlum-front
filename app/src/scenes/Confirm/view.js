/**
 * Send scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import log from 'utils/logging';

import { Root, Header, BackButton, P, PaymentConfirmation } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Confirm = ({ payments, vendors, payment, accounts, settings }) => {
  return (
    <Root>
      <Header>
        <BackButton />
        <P>Pay</P>
      </Header>
      {payment ? (
        <PaymentConfirmation
          payment={payment}
          payments={payments}
          vendors={vendors}
          accounts={accounts}
          settings={settings}
        />
      ) : null}
    </Root>
  );
};

export default Confirm;
