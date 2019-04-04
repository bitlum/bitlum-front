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
    restore: 'Send reset email',
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
    '403RPA03':
      'Receive is disabled because you reached maximum beta balance of {{maxBalanceBTC}} BTC',
    '422MWA00': 'Invoice is already expired',
    '403RPA01':
      'You do not have enough balance to pay {{amountString}} with {{feeString}} payment fees',
    '403RPA07':
      'You have unfinished payment requests for {{pendingRequestsSum}} and your balance is not enough to pay them and {{amountString}} with {{feeString}} payment fees',
    '403RPA06': 'You trying to send requests too often.\nNeed to send frequently? Contact us!',
    '403RPA09': 'You already have {{activeInvoices}} unexpired invoices\nwhile your limit is {{maxActiveInvoices}}.\n\nNeed more? Contact us!',
    '403RPA10': 'You already generated {{generatedInvoices}} invoices\nwhile your daily limit is {{maxDailyInvoices}}.\n\nNeed more? Contact us!',
    default: 'Oops, something went wrong',
  },
  tips: {
    fees: {
      lightning: 'We are charging 0.5% fee\nfor all lightning payments you send',
      blockchain:
        'We are charging 0.5% fee\n+ fixed 0.00006 BTC fee\nfor all blockchain payments you send',
    },
  },
  account: {
    id: 'Account ID',
    restrictions: 'Restrictions',
    balance: 'Balance',
    restoreSent: 'Your reset link sent to {{email}}!',
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
        onWithdrawBeforeAmount:
          'Specify how much you want to withdraw',
        main: 'Send Lightning Network Bitcoin payment\non address below to deposit them on wallet',
        onWithdrawMain: 'If you see an error on withdrawal try to\nmanually copy and paste the invoice below',
      },
    },
  },
};
