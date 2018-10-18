/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { Button } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Root = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 1em;
  background-color: var(--colors-bg-accent-dark);
  color: var(--colors-text-accent-dark);
`;

export default Root;
