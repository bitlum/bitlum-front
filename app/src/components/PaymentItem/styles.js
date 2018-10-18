/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { Input, Button, Span } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Amount = styled.span`
  width: 9em;
  text-align: right;
  color: ${({ direction }) =>
    direction === 'incoming' ? 'var(--colors-text-ok)' : 'var(--colors-text-error)'};

  &:before {
    content: '${({ direction }) => (direction === 'incoming' ? '+' : '-')}';
  }
`;

export const Time = styled.span`
  width: 8em;
`;

export const Status = styled.span`
  color: ${({ status }) => (status === 'pending' ? 'var(--colors-text-warn)' : null)};
  font-weight: ${({ status }) => (status === 'pending' ? '600' : null)};
`;

export const Address = styled.span`
  max-width: 40em;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;

  & > ${Span},
  & > ${Status},
  & > ${Address} {
    font-size: 0.6em;
  }
`;


export const Root = styled.div`
  padding: 0.5em 1.2em;
  display: flex;

  & > * {
    margin-right: 1em;
  }

  &:nth-child(2n){
    background-color: var(--colors-bg-accent-tint);
  }

  & > ${Info}:nth-child(2) {
    align-items: flex-end;
  }

  & > ${Info}:nth-child(3) > * {
    margin-bottom: 1em;
  }
`;

export default Root;
