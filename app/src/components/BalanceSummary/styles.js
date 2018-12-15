/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { NavLink as NavLinkCommon } from 'react-router-dom';

import { P } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  font-weight: 200;
  background: linear-gradient(45deg, #461a99 0%, #249ade 65%, #41d4cb 100%);
  border-radius: 0.7em;
  box-shadow: 0 0.6em 0.7em 0.2em rgba(21, 24, 46, 0.16);
  color: var(--colors__text_accent);
`;

export const Main = styled(P)`
  font-size: 2.5em;
`;

export const Additional = styled(P)`
  font-size: 1em;
`;

export const Receive = styled(NavLinkCommon)`
  position: absolute;
  top: 1em;
  left: 1em;
`;

export const Send = styled(NavLinkCommon)`
  font: var(--fonts__header_bold);
  margin-top: 1em;
`;

export default Root;
