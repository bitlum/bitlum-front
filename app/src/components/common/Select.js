/**
 * Styled component for Input
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import styled from 'styled-components';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const StyledSelect = styled.select`
  width: 100%;
  padding: 1.15em;
  font-size: 1em;
  background-color: #fff;
`;

const Container = styled.div`
  font-size: 1em;
  position: relative;
  border: 0.2rem solid var(--colors-bg-main);
  border-radius: 0.2em;
  overflow: hidden;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: calc(50% - 0.125em);
    right: 1em;
    width: 0;
    height: 0;
    border-left: 0.5em solid transparent;
    border-right: 0.5em solid transparent;
    border-top: 0.5em solid var(--colors-bg-main-dark);
    clear: both;
  }
`;

export const Select = ({ className, ...rest } = {}) => (
  <Container className={className}>
    <StyledSelect {...rest} />
  </Container>
);

export default Select;
