/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';

// More assets icons here
// https://github.com/cjdowner/cryptocurrency-icons/tree/master/svg/color
import { ReactComponent as BTC } from 'assets/icons/assets/btc.svg';
import { ReactComponent as LNBTC } from 'assets/icons/assets/lightning.svg';
import { ReactComponent as ETH } from 'assets/icons/assets/eth.svg';
import { ReactComponent as DASH } from 'assets/icons/assets/dash.svg';
import { ReactComponent as LTC } from 'assets/icons/assets/ltc.svg';
import { ReactComponent as BCH } from 'assets/icons/assets/bch.svg';

import styles from './index.module.css';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const icons = {
  BTC: {
    blockchain: <BTC className={styles.icon} />,
    lightning: <LNBTC className={styles.icon} />,
  },
  ETH: {
    blockchain: <ETH className={styles.icon} />,
  },
  DASH: {
    blockchain: <DASH className={styles.icon} />,
  },
  LTC: {
    blockchain: <LTC className={styles.icon} />,
  },
  BCH: {
    blockchain: <BCH className={styles.icon} />,
  },
};

const AssetChip = ({
  asset, type, onlyIcon, option, onSelect, onFocus, isFocused, className,
}) => {

  const currentAsset = option ? JSON.parse(option.value).asset : asset;
  const currentType = option ? JSON.parse(option.value).type : type;
  return (
    <div
      className={`${styles.root} ${className}`}
      onMouseDown={event => {
        if (typeof onSelect === 'function') {
          event.preventDefault();
          event.stopPropagation();
          onSelect(option, event);
        }
      }}
      onMouseEnter={event => {
        if (typeof onFocus === 'function') {
          onFocus(option, event);
        }
      }}
      onMouseMove={event => {
        if (isFocused) return;
        if (typeof onFocus === 'function') {
          onFocus(option, event);
        }
      }}
    >
      {currentAsset && currentType && icons[currentAsset][currentType]}
      {onlyIcon ? null : <span className={styles.name}>{currentAsset}</span>}
    </div>
  );
};

AssetChip.propTypes = {
  asset: PropTypes.oneOf(Object.keys(icons)),
  option: PropTypes.shape({
    value: PropTypes.string,
  }),
  onSelect: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
  isFocused: PropTypes.bool,
};

AssetChip.defaultProps = {
  asset: 'BTC',
  option: null,
  onSelect: null,
  onFocus: null,
  className: '',
  isFocused: false,
};

export default AssetChip;
