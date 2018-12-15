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
import isToday from 'date-fns/is_today';
import isYesteray from 'date-fns/is_yesterday';

import NavLink from 'react-router-dom';

import log from 'utils/logging';

import {
  Root,
  P,
  Span,
  Status,
  Img,
  Details,
  DetailsItem,
  MainInfo,
  AdditionalInfo,
  Vendor,
  Tip,
  CopyButton,
} from './styles';
import { payments } from '../../stores/data';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const getDate = date => {
  let distance;
  distance = formatDate(new Date(date), 'Do MMMM [at] HH:mm');
  if (isToday(date)) {
    distance = 'Today';
  }
  if (isYesteray(date)) {
    distance = 'Yesterday';
  }
  return distance;
};

export const PaymentItem = ({
  className,
  puid,
  type,
  txid,
  direction,
  denominations,
  description,
  receipt,
  status,
  vendorIcon,
  vendorName,
  updatedAt,
  t,
}) => {
  return (
    <Root className={className}>
      <MainInfo>
        <Vendor>
          <Img src={vendorIcon || 'https://static.thenounproject.com/png/404950-200.png'} />
          <P>
            <Span>{vendorName || 'Unknown'}</Span>
            <Span>{`${direction === 'incoming' ? 'Received' : 'Sent'} ${getDate(updatedAt)}`}</Span>
          </P>

          <Status status={status}>{`${status[0].toUpperCase()}${status.slice(1)}`}</Status>
        </Vendor>
        <Details>
          <DetailsItem align="right">
            {/* <Tip>Temporary Fee tips</Tip> */}
            <P>Fee</P>
            <P>
              <Span>
                {denominations.main.totalFee} {denominations.main.sign}
              </Span>
              <Span>
                {denominations.additional.totalFee} {denominations.additional.sign}
              </Span>
            </P>
          </DetailsItem>
          <DetailsItem accent align="right">
            <P>Total</P>
            <P>
              <Span>
                {denominations.main.amount} {denominations.main.sign}
              </Span>
              <Span>
                {denominations.additional.amount} {denominations.additional.sign}
              </Span>
            </P>
          </DetailsItem>
          {!description ? null : (
            <DetailsItem>
              <P>Description</P>
              <P>
                <Span unreadable={!description}>{description || receipt}</Span>
              </P>
              <CopyButton data={description || receipt} />
            </DetailsItem>
          )}
        </Details>
      </MainInfo>
      <AdditionalInfo>
        <Details>
          <DetailsItem>
            {/* <Tip>Temporary Preimage tips</Tip> */}
            <P>{type === 'blockchain' ? 'Transaction ID' : 'Preimage'}</P>
            <P>
              <Span unreadable>NEED TO SAVE PREIMAGE FROM PAYSERVEEEEER</Span>
            </P>
            <CopyButton data={txid} />
          </DetailsItem>
          <DetailsItem>
            {/* <Tip>Temporary Invoice tips</Tip> */}
            <P>{type === 'blockchain' ? 'Address' : 'Invoice'}</P>
            <P>
              <Span unreadable>{receipt}</Span>
            </P>
            <CopyButton data={receipt} />
          </DetailsItem>
        </Details>
      </AdditionalInfo>
    </Root>
  );
};

PaymentItem.propTypes = {};

PaymentItem.defaultProps = {};

export default PaymentItem;
