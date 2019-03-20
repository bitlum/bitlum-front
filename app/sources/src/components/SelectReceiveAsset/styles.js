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

import goToDetailsIcon from 'assets/icons/chevron-right.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const AssetItem = styled.div`
  cursor: pointer;
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
  & ${Img} {
    height: 2.7em;
    width: 2.7em;
    opacity: 0.7;
    margin-right: 1.6rem;
    border-radius: 0.3em;
  }
  & ${P} {
    display: flex;
    flex-direction: column;
  }
  & ${Span} {
    word-break: break-word;
  }
  & ${Span}:first-child {
    font: var(--fonts__text_bold);
  }
  & ${Span}:last-child {
    padding-top: 0.5em;
    font-size: 0.8em;
    color: var(--colors__text_dark);
  }

  &:after {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0.4;
    /* background: no-repeat url(${goToDetailsIcon}) center; */
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
  background-color: var(--colors__bg);
  justify-content: center;
  display: flex;
  flex-direction: column;

  & ${AssetItem}:last-of-type {
    /* background: transparent; */
    margin-top: 3em;
  }
`;

export default Root;
