/**
 * Auth scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import SignupFormCommon from 'components/SignupForm';
// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Root = styled.div`
  background-color: var(--colors__bg);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const SignupForm = styled(SignupFormCommon)`
  width: 400px;
`;
