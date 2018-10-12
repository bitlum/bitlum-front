/**
 * Styled component for input
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

const StyledInput = styled.input`
  width: 100%;
  padding: 1.15em;
  font-size: 1em;
  background-color: #fff;
  color: var(--colors-text-main);

  :not(:placeholder-shown) {
    padding-top: 1.7em;
    padding-bottom: 0.6em;
  }

  :invalid:not(:placeholder-shown) {
    background-color: #ffb7a8;
  }
`;

const StyledLabel = styled.label`
  opacity: 0.4;
  position: absolute;
  top: 0.9em;
  left: 1.6em;
  font-size: 0.7em;
  font-weight: 600;

  ${StyledInput}:placeholder-shown + & {
    opacity: 0;
  }

  :before {
    content: attr(data-label-valid);
  }

  ${StyledInput}:invalid & {
    color: red;
  }

  ${StyledInput}:invalid + &:before {
    content: attr(data-label-invalid);
  }
`;

const Container = styled.div`
  font-size: 1em;
  position: relative;
  border: 0.3rem solid var(--colors-bg-main);
  border-radius: 0.5em;
  overflow: hidden;
`;

export const Input = ({
  className,
  id,
  labelValid,
  labelInvalid,
  ...rest
} = {}) => (
  <Container className={className}>
    <StyledInput id={id} {...rest} />
    <StyledLabel htmlFor={id} data-label-valid={labelValid} data-label-invalid={labelInvalid} />
  </Container>
);

export default Input;
