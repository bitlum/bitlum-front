/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { Button, Span } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Amount = styled.span`
  color: ${({ direction }) =>
    direction === 'incoming' ? 'var(--colors-text-ok)' : 'var(--colors-text-error)'};

  &:before {
    content: '${({ direction }) => (direction === 'incoming' ? '+' : '-')}';
  }
`;

export const Status = styled.span`
  color: ${({ status }) => (status === 'pending' ? 'var(--colors-text-warn)' : null)};
  font-weight: ${({ status }) => (status === 'pending' ? '600' : null)};
`;

export const Address = styled.span`
  max-width: 100em;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;

  & > ${Span}, & > ${Status}, & > ${Address} {
    font-size: 0.8em;
    opacity: 0.8;
  }
`;

export const Root = styled.div`
  padding: 0.5em 1.2em;
  display: flex;

  & > * {
    margin-right: 1em;
  }

  &:nth-child(2n) {
    background-color: var(--colors-bg-accent-tint);
  }

  & > ${Info}:nth-child(1) {
    justify-content: center;
    margin-right: 0;
  }

  & > ${Info}:nth-child(1) svg {
    height: 0.8em;
    width: 0.8em;
  }

  & > ${Info}:nth-child(2) {
    justify-content: center;
    font-weight: 600;
    opacity: 0.6;
    font-size: 0.9em;
    min-width: 6em;
    align-items: flex-start;
  }

  & > ${Info}:nth-child(3) {
    min-width: 9em;
    align-items: flex-end;
  }
  & > ${Info}:nth-child(3) > ${Span} {
    font-size: 0.7em;
  }

  & > ${Info}:nth-child(4) {
    align-items: flex-start;
  }

  & > ${Info}:nth-child(4) > ${Span}:first-child {
    font-weight: 600;
    opacity: 0.6;
  }
`;

export default Root;
