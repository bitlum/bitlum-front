/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';
import { Span, P } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    padding: 1em;
  }
  & > div > ${Span} {
    font-weight: 600;
  }
`;

export default Root;
