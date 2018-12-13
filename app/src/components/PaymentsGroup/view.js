/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import log from 'utils/logging';

import AssetChip from 'components/AssetChip';

import {
  Root,
  Span,
  P,
  AmountAdditional,
  AmountMain,
  Vendor,
  Amount,
  Status,
  Button,
  Img,
  VendorIcon,
} from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const PaymentsGroup = ({
  className,
  payments,
  status,
  vendorName,
  vendorIcon,
  mainDenominationSign,
  mainDenominationRound,
  mainDenominationPrice,
  additionalDenominationSign,
  additionalDenominationRound,
  additionalDenominationPrice,
  t,
}) => {
  const groupedAmount = payments.reduce(
    (p, c) =>
      p +
      (c.direction === 'incoming' ? Number(c.amount) : -Number(c.amount) - Number(c.fees.total)),
    0,
  );
  return (
    <Root
      className={className}
      onClick={() => {
        console.log(payments);
      }}
    >
      <Status status={status} />
      <Vendor>
        <VendorIcon counter={payments.length}>
          <Img src={vendorIcon || 'https://static.thenounproject.com/png/404950-200.png'} />
        </VendorIcon>
        <P>
          <Span>
            {vendorName || 'Unknown'}({payments.length})
          </Span>
          <Span>{payments[0].description || payments[0].receipt}</Span>
        </P>
      </Vendor>
      <Amount>
        <AmountMain amount={groupedAmount}>
          {Math.floor(groupedAmount * mainDenominationPrice * 10 ** mainDenominationRound) /
            10 ** mainDenominationRound}{' '}
          {mainDenominationSign}
        </AmountMain>
        <AmountAdditional>
          {Math.floor(
            groupedAmount * additionalDenominationPrice * 10 ** additionalDenominationRound,
          ) /
            10 ** additionalDenominationRound}{' '}
          {additionalDenominationSign}
        </AmountAdditional>
      </Amount>
    </Root>
  );
};

PaymentsGroup.propTypes = {};

PaymentsGroup.defaultProps = {};

export default PaymentsGroup;
