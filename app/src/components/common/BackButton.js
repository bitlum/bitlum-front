/**
 * Styled component for button
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import styled from 'styled-components';

import backIcon from 'assets/icons/arrow-left.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const BackButton = styled(
  ({ children,  ...rest }) => (
    <div
      onClick={() => {
        window.history.back();
      }}
      {...rest}
    >
      {children}
    </div>
  ),
)`
  font-size: 1em;
  cursor: pointer;
  background: no-repeat url(${backIcon});
  background-size: contain;
  width: 1em;
  height: 1em;
  margin-left: 0.9em;
  margin-right: 1.4em;
`;

export default BackButton;
