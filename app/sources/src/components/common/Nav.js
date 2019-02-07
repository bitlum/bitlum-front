/**
 * Styled component for Nav
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const Nav = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};

  & > * {
    padding: 0.5em 1em;
    cursor: pointer;
  }

  & > *{
    text-decoration: none;
  }

  & > :hover,
  & > .active {
    color: var(--colors__text_accent);
    font-weight: 600;
  }
`;

export default Nav;
