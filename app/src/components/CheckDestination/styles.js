/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';
import { withLoader, Form, Span, P, Input } from 'components/common';

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

export const Root = withLoader(styled(Form)`
  font-size: 0.8em;
  & > ${P} {
    margin-bottom: 1em;
    margin-left: 1.2em;
  }
  & input::placeholder  {
    font-size: 0.8em;
  }
  & > ${Span} {
    word-break: initial;
    opacity: 0.8;
  }
`);

export default Root;
