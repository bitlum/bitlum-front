/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatDate from 'date-fns/format';

import log from 'utils/logging';

import { Root, P, AmountAdditional, AmountMain, Description, Amount, Time, Info } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const PaymentItem = ({
  className,
  updatedAt,
  description,
  isDescriptionReadable,
  direction,
  mainDenominationString,
  additionalDenominationString,
  t,
}) => {
  return (
    <Root
      className={className}
    >
      {' '}
      <Info>
        <Time>{formatDate(new Date(updatedAt),'HH:mm')}</Time>
        <Description wrap={isDescriptionReadable}>{description}</Description>
      </Info>
      <Amount>
        <AmountMain direction={direction}>
          {mainDenominationString}
        </AmountMain>
        <AmountAdditional direction={direction}>{additionalDenominationString}</AmountAdditional>
      </Amount>
    </Root>
  );
};

PaymentItem.propTypes = {};

PaymentItem.defaultProps = {};

export default PaymentItem;
