/**
 * Login scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import LoginFormCommon from 'components/LoginForm';

import LogoFull from 'assets/img/logo/full.png';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Root = styled.div`
  background-color: var(--colors-bg-main);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Logo = styled.img.attrs({
  src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
})`
  position: relative;
  content: url(${LogoFull});
  height: 4.5em;
  margin-bottom: 2em;
`;

export const LoginForm = styled(LoginFormCommon)`
  width: 400px;
`;
