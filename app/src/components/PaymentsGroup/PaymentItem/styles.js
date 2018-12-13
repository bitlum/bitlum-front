/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { P, Span, Img } from 'components/common';

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
  margin-left: 1.5em;
  margin-right: 1em;
  &:not(:last-child) {
    border-bottom: 0.1em solid var(--colors__bg_dark);
  }
  & ${Info}, & ${Amount} {
    margin-top: 1.6em;
    margin-bottom: 1.6em;
  }
  background-color: var(--colors__bg);
`;

export default Root;
