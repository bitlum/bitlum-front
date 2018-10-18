/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { P } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  background-color: var(--colors-bg-accent-bright);
  color: var(--colors-text-accent-bright);
`;

export const Available = styled(P)`
  font-size: 2.5em;
`;

export const Pending = styled(P)`
  font-size: 0.8em;
`;

export default Root;
