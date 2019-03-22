/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';
import { withLoader, Form, Span, P, A, Input, Message as MessageRaw } from 'components/common';

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

export const Message = styled(MessageRaw)`
  flex-direction: column;
  & ${Span} {
    font-weight: 600;
    margin-top: 0.5em;
    cursor: pointer;
  }
`;

export const Maintenance = styled(MessageRaw)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  text-align: center;
  background: var(--colors__bg_warn);
  font-weight: 400;
  & * {
    word-break: break-word;
  }
  & > ${Span} {
    font-weight: 600;
    padding: 0!important;
  }
`;

export const Root = withLoader(styled(Form)`
  height: 100%;

  & > ${P} {
    display: flex;
    flex-direction: column;
  }

  & > ${P}:first-child {
    margin-bottom: 1em;
    margin-left: 1.2em;
  }

  & ${P}:last-of-type {
    margin-top: auto;
    margin-bottom: 1em;
    border-top: 0.05em solid var(--colors__bg_dark);
    font-size: 0.8em;
    padding: 0.5em 1.5em;
  }

  & ${P}:last-of-type * {
    margin-top: 1em;
    word-break: break-word;
  }

  & ${P}:last-of-type ${Span}:first-of-type {
    font-weight: 500;
  }

  & input::placeholder {
    font-size: 0.8em;
  }
  & > ${Span} {
    word-break: initial;
    opacity: 0.8;
  }

  & ${A} {
    font-weight: 700;
    color: var(--colors__bg_accent);
    cursor: pointer;
  }

  & > ${A} {
    font-size: 0.6em;
    font-weight: 500;
    text-decoration: underline;
    margin-left: 2em;
    margin-top: 1em;
  }
`);

export default Root;
