/**
 * Various utils for easier styling and reducing boilerplate
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled, { css } from 'styled-components';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const withLoader = styledComponent => styled(styledComponent)`
  opacity: ${({ loading }) => (loading ? '0.3' : '1')};
  pointer-events: ${({ loading }) => (loading ? 'none' : 'initial')};
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
    display: ${({ loading }) => (loading ? 'block' : 'none')};
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

const mediaBreakpoints = {
  desktopXL: 1200,
  desktop: 992,
  tablet: 768,
  mobile: 576,
};

// Iterate through the sizes and create a media template
export const media = Object.keys(mediaBreakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${mediaBreakpoints[label] / 16}em) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
