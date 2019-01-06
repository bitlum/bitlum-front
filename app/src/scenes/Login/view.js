/**
 * Authentication scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import { Root, LoginForm, Logo, A, Span } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Login = ({history}) => (
  <Root>
    <Logo />
    <LoginForm />
    <A
      onClick={() => {
        history.push(`/signup`);
      }}
    >
      <Span>Do not have an account yet?</Span>
      <Span>Register here!</Span>
    </A>
    <Span className="openIntercom">Have any problems? Contact us!</Span>
  </Root>
);

export default Login;
