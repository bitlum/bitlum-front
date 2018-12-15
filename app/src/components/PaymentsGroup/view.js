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
    payments.reduce((p, c) => p + c.denominations.main.amount, 0),
    payments[0].denominations.main.precision,
  );
  const groupedAmountAdditional = round(
    payments.reduce((p, c) => p + c.denominations.additional.amount, 0),
    payments[0].denominations.additional.precision,
  );

  return (
    <Root className={className}>
      <GroupInfo
        folded={folded}
        onClick={e => {
          if (payments.length > 1) {
            toggleFold(!folded);
          } else {
            history.push(`/payment/${payments[0].puid}`);
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
          <AmountMain amount={groupedAmountMain}>
            {groupedAmountMain} {payments[0].denominations.main.sign}
          </AmountMain>
          <AmountAdditional>
            {groupedAmountAdditional} {payments[0].denominations.additional.sign}
          </AmountAdditional>
        </Amount>
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
              mainDenominationString={`${payment.denominations.main.amount} ${
                payment.denominations.main.sign
              }`}
              additionalDenominationString={`${payment.denominations.additional.amount} ${
                payment.denominations.additional.sign
              }`}
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
