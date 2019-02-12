/**
 * Entrypoint of all account store
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';

import LiveChat from 'utils/LiveChat';

import { denominations, payments } from 'stores';

import { createDataFetcher, round } from './dataGeneric';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const accounts = {
  round,
  async calcDenominations(balances) {
    const result = { ...balances };
    if (!denominations.get.data) {
      await denominations.get.run();
    }

    Object.keys(balances).forEach(balance => {
      result[balance] = { ...balances[balance] };
      result[balance].denominationsAvailable = {};
      result[balance].denominationsPending = {};
      Object.keys(denominations.get.data[balance]).forEach(denomination => {
        const amountAvailable = denominations.get.data[balance][denomination].round(
          balances[balance].available * denominations.get.data[balance][denomination].price,
        );

        const amountPending = denominations.get.data[balance][denomination].round(
          balances[balance].pending * denominations.get.data[balance][denomination].price,
        );

        result[balance].denominationsAvailable[denomination] = {
          ...denominations.get.data[balance][denomination],
          amountAvailable,
        };
        result[balance].denominationsAvailable[denomination].toString = () => {
          return denominations.get.data[balance][denomination].stringify(amountAvailable, {
            omitDirection: true,
          });
        };

        result[balance].denominationsPending[denomination] = {
          ...denominations.get.data[balance][denomination],
          amountPending,
        };
        result[balance].denominationsPending[denomination].toString = () => {
          return denominations.get.data[balance][denomination].stringify(amountPending, {
            omitDirection: true,
          });
        };
      });
    });

    return result;
  },
};

accounts.parseData = async data => {
  return {
    ...data,
    balances: { ...(await accounts.calcDenominations(data.balances)) },
  };
};

accounts.authenticate = createDataFetcher({
  name: 'AccountsAuthenticate',
  fetchOptions: {
    url: '/accounts/auth',
    method: 'POST',
    localFirst: true,
  },
  async onData(data) {
    // LiveChat.boot({
    //   email: data && data.email,
    //   user_id: data && data.auid,
    //   created_at: data && data.createdAt,
    // });
    const options = await accounts.get.fetchOptions();
    const dataParsed = await accounts.get.parseData(data, options);
    accounts.get.onDataDefault(dataParsed, undefined, options);
  },
  async run(email, password) {
    return this.startFetching({ body: { email, password } });
  },
  onCleanup() {
    // LiveChat.endSession();
    accounts.get.cleanup('all');
    Object.keys(payments).forEach(
      method => payments[method].cleanup && payments[method].cleanup('all'),
    );
  },
});

accounts.signup = createDataFetcher({
  name: 'AccountsSignup',
  fetchOptions: {
    url: '/accounts',
    method: 'POST',
  },
  parseData: accounts.parseData,
  async onData(data) {
    const dataParsed = await accounts.authenticate.parseData(
      data,
      accounts.authenticate.fetchOptions,
    );
    accounts.authenticate.onDataDefault(dataParsed, undefined, {
      ...accounts.authenticate.fetchOptions,
      fetchedOnline: true,
    });
  },
  async run(email, password, referralPassed) {
    let referral = referralPassed;
    if (!referral) referral = localStorage.getItem('referral') || email;
    this.startFetching({ body: { email, password, referral } });
  },
});

accounts.get = createDataFetcher({
  name: 'AccountsGet',
  parseData: accounts.parseData,
  async fetchOptions() {
    return {
      url: '/accounts',
      preserveDataOnError: true,
      headers: {
        Authorization: `Bearer ${accounts.authenticate.data && accounts.authenticate.data.token}`,
      },
    };
  },
  onError(error) {
    if (error.code.match('^401.*$')) {
      this.cleanup('all');
      accounts.authenticate.cleanup('all');
    }
  },
});

export default accounts;
