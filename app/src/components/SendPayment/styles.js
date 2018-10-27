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

export const AmountInput = styled(Input)`
  display: ${({ hidden }) => (hidden ? 'none' : 'initial')};
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
