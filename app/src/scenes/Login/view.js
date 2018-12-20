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
  </Root>
);

export default Login;
