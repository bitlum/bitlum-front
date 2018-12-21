/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { withLoader } from 'components/common';

import { P } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const AssetItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-right: 2rem;
  width: calc(100vw - 4rem);
  background-color: var(--colors__bg_bright);
  border-radius: 0.2em;
  overflow: hidden;
  margin-bottom: 0.3rem;
  padding: 1em 1em;
  margin-bottom: 0.5em;
  & ${P}:first-child {
    font: var(--fonts__text_bold);
  }
  & ${P}:last-child {
    padding-top: 0.5em;
    font-size: 0.8em;
    color: var(--colors__text_dark);
  }
`;

export const Root = styled.div`
  height: 100%;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--colors__bg);
  z-index: 10;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export default Root;
