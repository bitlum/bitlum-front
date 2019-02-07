/**
 * Styled component for Icon
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Info } from 'assets/icons/information-circled.svg';
import { ReactComponent as Warn } from 'assets/icons/android-alert.svg';
import { ReactComponent as Error } from 'assets/icons/close-circled.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const icons = {
  info: <Info />,
  warn: <Warn />,
  error: <Error />,
};

const Container = styled.button`
  height: 1em;
  width: 1em;
  font-size: 1em;
`;

export const Icon = ({
  i,
  className,
  ...rest
} = {}) => (
  <Container className={className}>
    {icons[i.toLowerCase()]}
  </Container>
);

export default Icon;

