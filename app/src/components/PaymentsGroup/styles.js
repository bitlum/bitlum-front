/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { P, Span, Img } from 'components/common';

import PaymentItemRaw from './PaymentItem';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const AmountMain = styled.span`
  color: ${({ amount }) => amount >= 0 && 'var(--colors__text_ok)'};
  &:before {
    content: '${({ amount }) => amount >= 0 && '+'}';
  }
`;

export const AmountAdditional = styled.span`
  &:before {
    content: '${({ amount }) => amount >= 0 && '+'}';
  }
  color: var(--colors__text_bright);
  margin-top: 0.4em;
`;
//
export const VendorIcon = styled.div`
  position: relative;

  & > ${Img} {
    background: #e3aff9;
    border-radius: 50%;
    height: 2.7em;
    width: 2.7em;
    padding: 0.3em;
  }

  &:after {
    content: '${({ counter }) => counter}';
    display: ${({ counter }) => (counter > 1 ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    background-color: var(--colors__bg);
    font-size: 0.8em;
    top: -0.7em;
    right: -0.7em;
    min-height:1.5em;
    min-width: 1.5em;
    border-radius: 50%;
    border: 0.25em solid var(--colors__bg_bright);
    position: absolute;
  }
`;

export const Status = styled.div`
  align-self: stretch;
  width: 0.25em;
  margin-right: 0.25em;
  background-color: ${({ status }) => `var(--colors__bg_${status})`};
`;

export const Vendor = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5em;
  & > ${P} {
    margin-left: 1.5em;
    display: flex;
    flex-direction: column;
    max-width: 12em;
  }
  & ${Span} {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & ${Span}:last-child {
    margin-top: 0.6em;
    font-size: 0.8em;
    color: var(--colors__text_bright);
  }
`;

export const Amount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 1em;
  margin-left: auto;
`;

export const GroupInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8em;
  cursor: pointer;
  & ${Vendor}, & ${Amount} {
    margin-top: 1.6em;
    margin-bottom: 1.6em;
  }

  &:hover ${Status} {
    margin-right: 0;
    width: 0.5em;
  }

  ${({ folded }) =>
    !folded &&
    `& ${Status} {
     margin-right: 0;
     width: 0.5em;
  }`}

  background-color: var(--colors__bg_bright);
`;

export const PaymentItem = styled(PaymentItemRaw)`
  cursor: pointer;
`;

export const GroupedItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 21.5em;
  margin-left: auto;
  ${({ folded }) => folded && 'overflow: hidden; max-height:0;'}
`;

/* transform: scaleY(1);   
  transform-origin: top;
  transition: max-height 0.15s, transform 0.15s;
  max-height:1000px;
  transform: scaleY(0); */

export const Root = styled.div``;

export default Root;
