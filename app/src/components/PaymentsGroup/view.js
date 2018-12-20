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
  GroupInfo,
  GroupedItems,
  PaymentItem,
} from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const PaymentsGroup = ({
  className,
  history,
  payments,
  round,
  status,
  vendorName,
  vendorIcon,
  t,
}) => {
  const [folded, toggleFold] = useState(true);
  const groupedAmountMain = round(
    payments.reduce((p, c) => p + c.denominations.main.total, 0),
    payments[0].denominations.main.precision,
  );
  const groupedAmountAdditional = round(
    payments.reduce((p, c) => p + c.denominations.additional.total, 0),
    payments[0].denominations.additional.precision,
  );
  const positiveTotal = groupedAmountMain >= 0 && groupedAmountAdditional > 0;
  return (
    <Root className={className}>
      <GroupInfo
        folded={folded}
        onClick={e => {
          if (payments.length > 1) {
            toggleFold(!folded);
          } else {
            history.push(`/payments/${payments[0].puid}`);
          }
        }}
      >
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
          <AmountMain positive={positiveTotal}>
            {payments[0].denominations.main.sign}
            {groupedAmountAdditional !== 0 && groupedAmountMain === 0
              ? ' ≈ '
              : positiveTotal
              ? ' +'
              : ' '}
            {groupedAmountMain.toFixed(payments[0].denominations.main.precision)}{' '}
          </AmountMain>
          <AmountAdditional>
            {payments[0].denominations.additional.sign}
            {groupedAmountMain !== 0 && groupedAmountAdditional === 0
              ? ' ≈ '
              : positiveTotal
              ? ' +'
              : ' '}
            {groupedAmountAdditional.toFixed(payments[0].denominations.additional.precision)}{' '}
          </AmountAdditional>
        </Amount>
        <Status status={status} counter={payments.length} />
      </GroupInfo>
      {folded ? null : (
        <GroupedItems>
          {payments.map(payment => (
            <PaymentItem
              key={payment.puid}
              puid={payment.puid}
              updatedAt={payment.updatedAt}
              isDescriptionReadable={payment.description}
              description={payment.description || payment.receipt}
              direction={payment.direction}
              mainDenominationString={`${payment.denominations.main.sign}${
                payment.denominations.additional.total !== 0 &&
                payment.denominations.main.total === 0
                  ? ' ≈ '
                  : payment.denominations.main.total >= 0 &&
                    payment.denominations.additional.total > 0
                  ? ' +'
                  : ' '
              }${payment.denominations.main.total.toFixed(payment.denominations.main.precision)}`}
              additionalDenominationString={`${payment.denominations.additional.sign}${
                payment.denominations.main.total !== 0 &&
                payment.denominations.additional.total === 0
                  ? ' ≈ '
                  : payment.denominations.main.total >= 0 &&
                    payment.denominations.additional.total > 0
                  ? ' +'
                  : ' '
              }${payment.denominations.additional.total.toFixed(
                payment.denominations.additional.precision,
              )}`}
            />
          ))}
        </GroupedItems>
      )}
    </Root>
  );
};

PaymentsGroup.propTypes = {};

PaymentsGroup.defaultProps = {};

export default PaymentsGroup;
