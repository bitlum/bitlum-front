/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { withLoader, Form, Span, P, Input, Img } from 'components/common';

import BalanceSummaryRaw from 'components/BalanceSummary';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const DestinationInfo = styled.div`
  display: flex;
  flex-direction: column;
  & ${P} {
    margin-bottom: 0.5em;
  }
  & ${Span} {
    font-weight: 600;
  }
`;

export const BalanceSummary = styled(BalanceSummaryRaw)``;

export const AmountInput = styled(Input)`
  display: ${({ hidden }) => (hidden ? 'none' : 'initial')};
`;

export const Vendor = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1em;
  margin-top: 1.8em;
  margin-bottom: 1.8em;
  width: 100%;
  font-size: 0.8em;
  & > ${Img} {
    background: #e3aff9;
    border-radius: 50%;
    height: 2.7em;
    width: 2.7em;
    padding: 0.3em;
  }
  & > ${P} {
    margin-left: 1.5em;
    display: flex;
    flex-direction: column;
    max-width: 14em;
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

export const Root = withLoader(styled(Form)`
  & > ${P} {
    font-weight: 600;
  }

  & > ${Span} {
    word-break: initial;
    font-size: 0.8em;
    opacity: 0.8;
  }
`);

export default Root;
