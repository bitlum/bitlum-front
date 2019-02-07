/**
 * Authentication scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import { Root, LoginForm, Logo, A, Span, Button } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Login = ({ history }) => (
  <Root>
    <Logo />
    <LoginForm />
    {process.env.NODE_ENV === 'development' ? (
      <Button
        primary
        onClick={() => {
          window.chrome.permissions.request(
            {
              origins: ['http://lvh.me/*'],
            },
            () => {},
          );
        }}
      >
        Enable access to lvh.me
      </Button>
    ) : null}
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
