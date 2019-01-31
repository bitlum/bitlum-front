/**
 * English translation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export default {
  empty: '',
  general: {
    // Company name to use in copyrights e.t.c.
    companyName: 'Bitlum',
    testnetURL: 'https://testnet.bitlum.io',
    mainnetURL: 'https://mainnet.bitlum.io',
  },
  nav: {
    home: 'Home',
    login: 'Login',
    signup: 'Sign Up',
    signout: 'Sign Out',
    payments: 'Payments',
    account: 'Account',
    send: 'Send',
    receive: 'Receive',
  },
  payments: {
    states: {
      pending: 'Pending',
      completed: 'Completed',
    },
    from: 'From',
    to: 'To',
    hash: 'Payment hash',
    txid: 'TXID',
    types: {
      lightning: 'Lightning',
      blockchain: 'Blockchain',
    },
    amount: 'Amount',
    amountInvalid: 'Wrong amount',
    send: 'Send payment',
    receive: 'Receive payment',
    addressType: {
      lightning: 'Invoice',
      blockchain: 'Address',
    },
  },
  errors: {
    '401MAC01': 'Wrong password for account {{email}}',
    '404RAC00': 'Account {{email}} does not exists',
    '500MCO12': 'Account {{email}} already exists<1>Login instead?</1>',
    '403RPA03': 'Receive is disabled because you reached maximum beta balance of {{maxBalanceBTC}} BTC',
    '422MWA00': 'Invoice is already expired',
    default: 'Oops, something went wrong',
  },
  account: {
    id: 'Account ID',
    restrictions: 'Restrictions',
    balance: 'Balance',
  },
  auth: {
    email: 'Your email',
    emailInvalid: 'Wrong email',
    password: 'Your password',
    passwordInvalid: 'Wrong password',
  },
  confirmed: {
    failed: {
      description: 'Your payment failed, but we’re not sure why',
      cta: 'Contact us',
    },
    completed: {
      description: '',
      cta: '',
    },
    pending: {
      description: 'Payment has been sent, but is still in a pending state',
      cta: 'View transactions',
    },
  },
  receive: {
    tips: {
      blockchain: {
        main: 'Send Bitcoin on address\nbelow to deposit them on wallet',
      },
      lightning: {
        beforeAmount:
          'Specify how much you want to receive.\nLeave 0 if you want to receive any amount',
        main: 'Send Lightning Network Bitcoin payment\non address below to deposit them on wallet',
      },
    },
  },
};
