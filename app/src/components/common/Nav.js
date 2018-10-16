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
  position: relative;

  & ul {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
  }

  & ul {
    display: flex;
    overflow: hidden;
    justify-content: center;
    list-style-type: none;
  }

  & ul li {
    margin-left: 50px;
  }

  & ul li a {
    color: var(--main-color);
    text-decoration: none;
  }

  & ul li a:hover,
  & ul li a.selected {
    color: var(--accent-color);
  }
`;

export default Nav;
