/**
 * Payments scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { ReactComponent as EmptyIconRaw } from 'assets/icons/paper.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const EmptyIcon = styled(EmptyIconRaw)``;

export const Root = styled.div`
  & > ${EmptyIcon} {
    margin-bottom: 2em;
    height: 6em;
    opacity: ${({ empty }) => (empty ? '0.3' : '0')};
  }
  ${({ empty }) =>
    empty &&
    `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      font-size: 2em;
      text-align: center;
      margin-top: 2em;
  `};
`;

export default Root;
