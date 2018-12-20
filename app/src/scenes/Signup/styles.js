/**
 * Auth scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import SignupFormCommon from 'components/SignupForm';

import LogoFull from 'assets/img/logo/full.png';

import { A, Span } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

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
  & ${A} {
    margin-top: 3.5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--colors__bg_accent);
    font-size: 0.8em;
  }
`;

export const Logo = styled.img.attrs({
  src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
})`
  position: relative;
  content: url(${LogoFull});
  height: 4.5em;
  margin-bottom: 2em;
`;

export const SignupForm = styled(SignupFormCommon)`
  width: 100%;
  & button {
    margin-top: 1.5em;
  }
`;
