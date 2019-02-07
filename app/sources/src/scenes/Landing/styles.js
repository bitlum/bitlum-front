/**
 * Landing scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import SignupFormCommon from 'components/SignupForm';

import { Div, media, Span } from 'components/common';

import LogoFull from 'assets/img/logo/full.png';
import LogoTextOnly from 'assets/img/logo/textOnly.png';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Logo = styled.img.attrs({
  src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
})`
  position: relative;
  content: url(${LogoFull});
  height: 7.5em;
  ${media.desktop`
    content: url(${LogoTextOnly});
  `};
`;

export const Uvp = styled.div`
  padding-left: 1em;
  grid-area: left;
  align-items: flex-end;
  font-family: 'Open Sans', sans-serif;
  text-align: right;
`;

export const UvpTitle = styled.div`
  margin-top: -0.5em;
  display: flex;
  flex-direction: column;
  & > ${Span} {
    word-break: initial;
  }
  font-size: 2.7em;
`;

export const UvpDesc = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  font-size: 1em;
  font-weight: 500;
  word-break: initial;
`;

export const SignupForm = styled(SignupFormCommon)``;

export const Disclaimer = styled.div`
  position: relative;
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: var(--colors__text_error);
  & ${Span} {
    margin-bottom: 0.3em;
  }
  /* :before {
    content: '*';
    position: absolute;
  } */
`;

export const Root = styled.div`
  background-color: var(--colors__bg);
  display: grid;
  grid-template-areas:
    'left right'
    'left right';
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 0 4em;
  height: 100%;

  & > ${Div}, & > ${Uvp} {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }

  & > ${Div}:last-child {
    grid-area: right;
    align-items: flex-start;
  }

  & ${SignupForm} {
    width: 90%;
    max-width: 400px;
    min-width: 400px;
  }

  ${media.desktop`
    & > ${Uvp},
    & > ${Div}:last-child {
      align-items: center;
    }
    grid-template-areas: "left left"
                         "right right";
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  `};
`;

export default Root;
