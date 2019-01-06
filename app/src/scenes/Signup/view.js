/**
 * Authentication scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import { Root, Logo, SignupForm, A, Span } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Signup = ({history}) => (
  <Root>
    <Logo />
    <SignupForm />
    <A
      onClick={() => {
        history.push(`/login`);
      }}
    >
      <Span>Already have account?</Span>
      <Span>Login instead</Span>
    </A>
    <Span className="openIntercom">Have any problems? Contact us!</Span>
  </Root>
);

export default Signup;
