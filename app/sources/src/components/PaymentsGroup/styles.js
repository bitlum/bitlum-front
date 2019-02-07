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

import goToDetailsIcon from 'assets/icons/chevron-right.svg';
import unfoldGroupIcon from 'assets/icons/chevron-down.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const AmountMain = styled.span`
  font-size: 1.12em;
  color: ${({ positive }) => positive && 'var(--colors__text_ok)'};
`;

export const AmountAdditional = styled.span`
  font-size: 0.8em;
  color: var(--colors__text_bright);
  margin-top: 0.5em;
`;
//
export const VendorIcon = styled.div`
  position: relative;
  height: 2.7em;
  
  & > ${Img} {
    background: ${({ color }) => color || '#fff'};
    filter: ${({ color }) => color && 'saturate(0.5) brightness(1.12) contrast(1.1)'};
    opacity: ${({ color }) => color && 0.7};
    padding: ${({ color }) => color && '0.4em'};
    border-radius: 0.3em;
    height: 2.7em;
    width: 2.7em;
  }

  &:after {
    content: '${({ counter }) => counter}';
    display: ${({ counter }) => (counter > 1 ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    background-color: var(--colors__bg_accent);
    font: var(--fonts__text_bold);
    color: var(--colors__bg_bright);
    font-size: 0.7em;
    top: -0.7em;
    right: -0.7em;
    min-height:1.7em;
    min-width: 1.7em;
    border-radius: 50%;
    border: 0.25em solid var(--colors__bg_bright);
    position: absolute;
  }
`;

export const Status = styled.div`
  position: relative;
  align-self: stretch;
  width: 0.4em;
  margin-left: 0.6em;
  background-color: ${({ status }) =>
    status === 'completed' ? '#fff' : `var(--colors__bg_${status})`};
  &:before {
    background-size: contain;
    height: 100%;
    width: 0.6em;
    background: var(--colors__bg_dark);
    color: var(--colors__bg_bright);
    position: absolute;
  }
`;

export const Vendor = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.2em;
  & > ${P} {
    margin-left: 1.5em;
    display: flex;
    flex-direction: column;
    max-width: 8em;
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
    margin-top: 1.4em;
    margin-bottom: 1.4em;
  }

  &:hover ${Status} {
    margin-left: 0.4em;
    width: 0.6em;
    &:before {
      content: '';
    }
  }

  ${({ folded }) =>
    !folded &&
    `& ${Status} {
     margin-left: 0.4em;
     width: 0.6em;
     &:before {
      content: '';
    }
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
`;
/* ${({ folded }) => folded && 'overflow: hidden; max-height:0;'} */
/* transform: scaleY(1);   
  transform-origin: top;
  transition: max-height 0.15s, transform 0.15s;
  max-height:1000px;
  transform: scaleY(0); */

export const Root = styled.div`
  border-radius: 0.2em;
  overflow: hidden;
`;

export default Root;
