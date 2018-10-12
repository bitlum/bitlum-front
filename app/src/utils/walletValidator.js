/**
 * Toolkit for wallet address validation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import log from 'utils/logging';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

// Good source of assets regexps
// https://github.com/k4m4?tab=repositories

const validations = {
  BTC: {
    mainnet: {
      blockchain: '^([13]|bc1)([a-km-zA-HJ-NP-Z1-9]{25,34}|[a-zA-Z0-9]{39,59})$',
      lightning: '^ln..\\d+(m|n|u|p).*$',
    },
    testnet: {
      blockchain: '^([2nm]|tb1)([a-km-zA-HJ-NP-Z1-9]{25,34}|[a-zA-Z0-9]{39,59})$',
      lightning: '^lnt..\\d+(m|n|u|p).*$',
    },
    simnet: { blockchain: '.*' },
  },
  ETH: {
    mainnet: { blockchain: '^(?:0x)?[a-fA-F0-9]{40}$' },
    testnet: { blockchain: '^(?:0x)?[a-fA-F0-9]{40}$' },
    simnet: { blockchain: '.*' },
  },
  BCH: {
    mainnet: {
      blockchain:
        '^([13][a-km-zA-HJ-NP-Z1-9]{25,34})|^((bitcoincash:)?(q|p)[a-z0-9]{41})|^((BITCOINCASH:)?(Q|P)[A-Z0-9]{41})$',
    },
    testnet: { blockchain: '^([2m]|bchtest:)([a-km-zA-HJ-NP-Z1-9]{33,34}|[a-zA-Z0-9]{42})$' },
    simnet: { blockchain: '.*' },
  },
  DASH: {
    mainnet: { blockchain: '^(X|7)[1-9A-HJ-NP-Za-km-z]{33}$' },
    testnet: { blockchain: '^(y|8)[1-9A-HJ-NP-Za-km-z]{33}$' },
    simnet: { blockchain: '.*' },
  },
  LTC: {
    mainnet: { blockchain: '^([LMZ3]|ltc1)([a-km-zA-HJ-NP-Z1-9]{26,33}|[a-zA-Z0-9]{39,59})$' },
    testnet: { blockchain: '^([23mn]|tltc1)([a-km-zA-HJ-NP-Z1-9]{26,34}|[a-zA-Z0-9]{39,59})$' },
    simnet: { blockchain: '.*' },
  },
  validate(asset, type, address, network) {
    if ([asset, address].some(i => i === undefined)) {
      log.error({
        error: { message: 'One of required params (asset, address) not defined', code: 400 },
      });
      return false;
    }
    if (this[asset] === undefined) {
      log.error({
        error: { message: `No validation available for ${asset}`, code: 400 },
      });
      return false;
    }
    if (this[asset][network] === undefined) {
      log.error({
        error: { message: `Unexisting network ${network} for ${asset}`, code: 400 },
      });
      return false;
    }
    if (this[asset][network][type] === undefined) {
      log.error({
        error: { message: `Unexisting type ${type} for ${asset} in ${network} network`, code: 400 },
      });
      return false;
    }

    return new RegExp(this[asset][network][type]).test(
      address,
    );
  },
};

export default validations;
