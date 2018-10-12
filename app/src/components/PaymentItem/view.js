/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import { t } from 'i18next';

import log from 'utils/logging';

import AssetChip from 'components/AssetChip';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Payment = ({ amount, direction, from, to, asset, type, status, createdAt, txid, fee }) => {
  return (
    <div>
      <span>
        {distanceInWordsStrict(new Date(), new Date(Number(createdAt)), {
          addSuffix: true,
          includeSeconds: true,
        })}
      </span>
      <span>{`${
        direction === 'outgoing' ? '- ' : ''
      }${Math.floor(amount * 10 ** 8) / 10 ** 8} ${asset}`}</span>
      {/* <AssetChip className={styles.assetIcon} onlyIcon={true} type={type} /> */}
      <span>{type}</span>
    </div>
  );
};

Payment.propTypes = {};

Payment.defaultProps = {};

export default Payment;
