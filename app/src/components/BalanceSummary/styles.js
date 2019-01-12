/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import { P, Img } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Main = styled(P)`
  font-size: 2.3em;
  font-weight: 400;
`;

export const Additional = styled(P)`
  font-size: 1em;
  font-weight: 600;
  opacity: 0.5;
  position: absolute;
  bottom: 0.8em;
  left: 1em;
`;

export const Receive = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.75;
  position: absolute;
  top: 0.8em;
  right: 1em;
  font-weight: 500;
  font-size: 0.9em;
  &:hover {
    opacity: 1;
  }
  & ${Img} {
    filter: invert(100%);
    height: 1em;
    width: 1em;
    margin-left: 0.3em;
    margin-top: 0.1em;
  }
`;

export const Send = styled(NavLink)`
  font: var(--fonts__header_bold);
  margin-top: 1em;
`;

export const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 200;

  ${({ appearance }) =>
    appearance !== 'onlyBalance' &&
    `   &:before {
          content: 'BALANCE';
          position: absolute;
          top: 0.8em;
          left: 1em;
          opacity: 0.6;
        }
        & ${Main} {
          padding-left: 0.4em;
        }
        align-items: flex-start;
        background: var(--colors__bg_dark);
        // background: linear-gradient(45deg, #461a99 0%, #249ade 65%, #41d4cb 100%);
        border-radius: 0.7em;
        // box-shadow: 0 0.6em 0.7em 0.2em rgba(21, 24, 46, 0.16);
        color: var(--colors__text_accent);
    `}
`;

export default Root;
