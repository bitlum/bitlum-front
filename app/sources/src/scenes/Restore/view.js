/**
 * Authentication scene
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';

import { Root, Logo, RestoreForm, A, Span, Header, P, BackButton } from './styles';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const Restore = ({ history }) => (
  <Root>
    <Header>
      <BackButton />
      <P>Reset password</P>
    </Header>
    <RestoreForm history={history} />
    <Span className="openIntercom">Have any problems? Contact us!</Span>
  </Root>
);

export default Restore;
