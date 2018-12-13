/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import log from 'utils/logging';

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
  GroupHeader,
  GroupedItems,
  PaymentItem,
} from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const round = (number, roundGrade) => Math.floor(number * 10 ** roundGrade) / 10 ** roundGrade;

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
  const [folded, toggleFold] = useState(true);

  const groupedAmount = payments.reduce(
    (p, c) =>
      p +
      (c.direction === 'incoming' ? Number(c.amount) : -Number(c.amount) - Number(c.fees.total)),
    0,
  );
  return (
    <Root className={className}>
      <GroupHeader
        onClick={e => {
          if (payments.length > 1) {
            toggleFold(!folded);
          }
        }}
      >
        <Status status={status} />
        <Vendor>
          <VendorIcon counter={payments.length}>
            <Img src={vendorIcon || 'https://static.thenounproject.com/png/404950-200.png'} />
          </VendorIcon>
          <P>
            <Span>{vendorName || 'Unknown'}</Span>
            <Span>{payments[0].description || payments[0].receipt}</Span>
          </P>
        </Vendor>
        <Amount>
          <AmountMain amount={groupedAmount}>
            {round(groupedAmount * mainDenominationPrice, mainDenominationRound)}{' '}
            {mainDenominationSign}
          </AmountMain>
          <AmountAdditional>
            {round(groupedAmount * additionalDenominationPrice, additionalDenominationRound)}{' '}
            {additionalDenominationSign}
          </AmountAdditional>
        </Amount>
      </GroupHeader>
      <GroupedItems folded={folded}>
        {payments.map(payment => (
          <PaymentItem
            updatedAt={payment.updatedAt}
            isDescriptionReadable={payment.description}
            description={payment.description || payment.receipt}
            direction={payment.direction}
            mainDenominationString={`${round(
              (payment.direction === 'incoming'
                ? Number(payment.amount)
                : -Number(payment.amount) - Number(payment.fees.total)) * mainDenominationPrice,
              mainDenominationRound,
            )} ${mainDenominationSign}`}
            additionalDenominationString={`${round(
              (payment.direction === 'incoming'
                ? Number(payment.amount)
                : -Number(payment.amount) - Number(payment.fees.total)) *
                additionalDenominationPrice,
              additionalDenominationRound,
            )} ${additionalDenominationSign}`}
          />
        ))}
      </GroupedItems>
    </Root>
  );
};

PaymentsGroup.propTypes = {};

PaymentsGroup.defaultProps = {};

export default PaymentsGroup;
