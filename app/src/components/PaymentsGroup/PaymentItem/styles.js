/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { P, Span, Img } from 'components/common';

import goToDetailsIcon from 'assets/icons/chevron-right.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const AmountMain = styled.span`
  color: ${({ direction }) => direction === 'incoming' && 'var(--colors__text_ok)'};
  &:before {
    content: '${({ direction }) => direction === 'incoming' && '+'}';
  }
`;

export const AmountAdditional = styled.span`
  color: var(--colors__text_bright);
  margin-top: 0.4em;
  &:before {
    content: '${({ direction }) => direction === 'incoming' && '+'}';
  }
`;

export const Time = styled.span``;
export const Description = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;  
  max-width: 15em;
  word-break: break-word;
  white-space: ${({ wrap }) => (wrap ? 'normal' : 'nowrap')};
  margin-top: 0.6em;
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--colors__text_bright);
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Amount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
`;

export const Root = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 0.8em;
  margin-left: 1.7em;
  padding-right: 3.5em;
  position: relative;
  &:not(:last-child) {
    border-bottom: 0.1em solid var(--colors__bg_dark);
  }
  & ${Info}, & ${Amount} {
    margin-top: 1.6em;
    margin-bottom: 1.6em;
  }
  &:after {
    position: absolute;
    right: 1.4em;
    opacity: 0.4;
    background: no-repeat url(${goToDetailsIcon}) center;
    background-color: var(--colors__bg_dark);
    height: 100%;
    width: 1em;
    background-size: contain;
  }
  &:hover:after {
    display: block;
    content: '';
  }

  background-color: var(--colors__bg);
`;

export default Root;
