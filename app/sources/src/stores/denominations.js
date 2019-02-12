/**
 * Entrypoint of denominations store
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import logger from 'utils/logging';

import { settings } from 'stores';

import { createDataFetcher, round } from './dataGeneric';

const log = logger();

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const denominations = {
  default: {
    BTC: {
      USD: {
        price: 4000,
        sign: 'USD',
        precision: 2,
        precisionMax: 5,
        round(number) {
          return round(number, this.precision, this.precisionMax);
        },
        stringify(number, { omitDirection = false, omitSign = false } = {}) {
          return `${omitDirection ? '' : number === 0 ? '' : number > 0 ? '+ ' : '- '}${
            omitSign ? '' : `${this.sign} `
          }${this.round(Math.abs(number))
            .toFixed(this.precisionMax || 1)
            .replace(/0+$/, '')
            .replace(/\.$/, '')}`;
        },
      },
      SAT: {
        price: 10 ** 8,
        sign: 'SAT',
        precision: 0,
        precisionMax: 0,
        round(number) {
          return round(number, this.precision, this.precisionMax);
        },
        stringify(number, { omitDirection = false, omitSign = false } = {}) {
          return `${omitDirection ? '' : number === 0 ? '' : number > 0 ? '+ ' : '- '}${
            omitSign ? '' : `${this.sign} `
          }${this.round(Math.abs(number))
            .toFixed(this.precisionMax || 1)
            .replace(/0+$/, '')
            .replace(/\.$/, '')}`;
        },
      },
    },
  },
};

denominations.get = createDataFetcher({
  name: 'DenominationsGet',
  fetchOptions: {
    localOnly: true,
    defaultValue: { data: denominations.default },
  },
  async parseData(localDenominations) {
    const allDenominations = {
      ...denominations.default,
      ...localDenominations,
    };

    if (!settings.get.data) {
      await settings.get.run();
    }

    Object.keys(allDenominations).forEach(asset => {
      allDenominations[asset].main =
        allDenominations[asset][settings.get.data[`denominations_${asset}_main`]];
      allDenominations[asset].additional =
        allDenominations[asset][settings.get.data[`denominations_${asset}_additional`]];
    });
    return allDenominations;
  },
});

export default denominations;
