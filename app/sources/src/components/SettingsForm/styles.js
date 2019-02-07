/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { withLoader } from 'components/common';

import { Img, Span, P } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const SettingsItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 2rem;
  margin-right: 2rem;
  width: calc(100vw - 4rem);
  background-color: var(--colors__bg_bright);
  border-radius: 0.2em;
  overflow: hidden;
  margin-bottom: 0.3rem;
  padding: 1em 1em;
  padding-right: 2em;
  margin-bottom: 0.5em;

  & > *:first-child {
    font: var(--fonts__text_bold);
  }
  & > *:last-child {
    cursor: pointer;
  }

  & ${Span} {
    word-break: break-word;
    font-size: 0.8em;
  }

  &:after {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0.4;
    background-color: var(--colors__bg_dark);
    height: 100%;
    width: 0.6em;
    background-size: contain;
  }
  &:hover:after {
    display: block;
    content: '';
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
