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
        price: 7500,
        sign: 'USD',
        precision: 2,
        precisionMax: 5,
        round(number, { precisionMax, precision } = {}) {
          return round(number, precision || this.precision, precisionMax || this.precisionMax);
        },
        stringify(
          number,
          {
            omitDirection = false,
            omitSign = false,
            directionsShown = ['positive', 'negative'],
          } = {},
        ) {
          return `${
            omitDirection
              ? ''
              : number === 0
              ? ''
              : number > 0
              ? directionsShown.includes('positive')
                ? '+ '
                : ''
              : directionsShown.includes('negative')
              ? '- '
              : ''
          }${omitSign ? '' : `${this.sign} `}${this.round(Math.abs(number))
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
        round(number, { precisionMax, precision } = {}) {
          return round(number, precision || this.precision, precisionMax || this.precisionMax);
        },
        stringify(
          number,
          {
            omitDirection = false,
            omitSign = false,
            directionsShown = ['positive', 'negative'],
          } = {},
        ) {
          return `${
            omitDirection
              ? ''
              : number === 0
              ? ''
              : number > 0
              ? directionsShown.includes('positive')
                ? '+ '
                : ''
              : directionsShown.includes('negative')
              ? '- '
              : ''
          }${omitSign ? '' : `${this.sign} `}${this.round(Math.abs(number))
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
    url: '/rates/BTC',
    localFirst: true,
    preserveDataOnError: true,
    preventRefetch: false,
    localLifetime: 2 * 60 * 60 * 1000,
    defaultValue: { data: denominations.default },
  },
  async parseData(pricesFetched) {
    const allDenominations = {
      ...denominations.default,
    };

    Object.keys(allDenominations).forEach(asset => {
      if (allDenominations[asset].USD && Number(pricesFetched[asset].value)) {
        allDenominations[asset].USD.price = Number(pricesFetched[asset].value);
      }
    });

    if (!settings.get.data) {
      await settings.get.run();
    }

    Object.keys(allDenominations).forEach(asset => {
      allDenominations[asset].main =
        allDenominations[asset][
          (settings.get.data || settings.default)[`denominations_${asset}_main`]
        ];
      allDenominations[asset].additional =
        allDenominations[asset][
          (settings.get.data || settings.default)[`denominations_${asset}_additional`]
        ];
    });
    return allDenominations;
  },
});

export default denominations;
