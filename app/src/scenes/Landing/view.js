/**
 * Public landing scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import { Root, Div, Uvp, SignupForm, Logo, Span, UvpDesc, UvpTitle, Disclaimer } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Landing = () => (
  <Root>
    <Uvp>
      <Logo />
      <UvpTitle>
        <Span>Lightning Network</Span>
        <Span>web wallet</Span>
      </UvpTitle>
      <UvpDesc>
        <Span>Fast, easy, no node install and synchronisation,</Span>
        <Span>no need to lock funds in channels and rebalance</Span>
      </UvpDesc>
    </Uvp>
    <Div>
      <SignupForm />
      <Disclaimer>
        <Span>This is beta product, do not put a lot of money in it yet ;)</Span>
        <Span>If you will be too #reckless you can loose your funds</Span>
      </Disclaimer>
    </Div>
  </Root>
);

export default Landing;
