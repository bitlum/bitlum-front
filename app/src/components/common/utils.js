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
  /* opacity: ${({ loading }) => (loading ? '0.3' : '1')}; */
  filter: ${({ loading }) => loading && 'blur(2px)'};
  pointer-events: ${({ loading }) => (loading ? 'none' : 'initial')};
  :after {
    position:absolute;
    content: '';
    z-index: 1000;
    background-color: rgba(255,255,255,0.8);
    width: 100%;
    height: 100%;
    top: 0;
    display: ${({ loading }) => (loading ? 'block' : 'none')};
  }
  :before {
    z-index: 2000;
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
