/**
 * Payments scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { P, Header as HeaderRaw } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Header = styled(HeaderRaw)`
  height: var(--sizing__header_heigh);
  font: var(--fonts__header_thin);
`;

export const Root = styled.div`
  font-size: 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 4em;
`;

export default Root;
