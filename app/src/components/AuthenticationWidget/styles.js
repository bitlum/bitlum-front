/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Root = styled.form`
  padding: 2em;
  position: relative;
  opacity: ${({ loading }) => (loading ? '0.3' : '1')};
  :before {
    z-index: 1;
    content: '';
    position: absolute;
    width: 2em;
    height: 2em;
    left: calc(50% - 1em);
    bottom: calc(50% - 1em);
    background-color: #333;
    border-radius: 100%;
    animation: sk-scaleout 1s infinite ease-in-out;
    visibility: ${({ loading }) => (loading ? 'visible' : 'hidden')};
  }
  @keyframes sk-scaleout {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

export default Root;
