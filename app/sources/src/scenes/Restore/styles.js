/**
 * Auth scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import RestoreFormCommon from 'components/RestoreForm';

import LogoFull from 'assets/img/logo/full.png';

import { A, Span, Header as HeaderRaw } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Header = styled(HeaderRaw)`
  background: var(--colors__bg);
  font: var(--fonts__header_thin);
  min-height: var(--sizing__header_heigh);
  border-bottom: 0.05em solid var(--colors__bg_dark);
`;

export const Root = styled.div`
  background-color: var(--colors__bg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  & ${A} ${Span}:last-child {
    font: var(--fonts__text_bold);
  }
  & > ${A} {
    margin-top: 3.5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--colors__bg_accent);
    font-size: 0.8em;
  }
  & > ${Span} {
    margin-top: 1.5em;
    font-size: 0.8em;
    color: var(--colors__bg_accent);
    cursor: pointer;
    margin-bottom: auto;
  }
`;

export const Logo = styled.img.attrs({
  src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
})`
  position: relative;
  content: url(${LogoFull});
  height: 3.5em;
  margin-bottom: 2em;
`;

export const RestoreForm = styled(RestoreFormCommon)`
  width: calc(100% - 2em);
  margin: 0 1em;
  margin-top: 1em;
  & > div:last-of-type input {
    margin-bottom: 1.5em;
  }
`;
