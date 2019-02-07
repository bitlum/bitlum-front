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

const StyledInput = styled.input`
  width: 100%;
  padding: 1.15em;
  font-size: 1em;
  background-color: #fff;

  :not(:placeholder-shown) {
    padding-top: 1.7em;
    padding-bottom: 0.6em;
  }

  :invalid:not(:placeholder-shown) {
    background-color: var(--colors__bg_error);
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

  ${StyledInput}:invalid:not(:placeholder-shown) + & {
    color: var(--colors__text_error);
  }

  ${StyledInput}:invalid:not(:placeholder-shown) + &:before {
    content: attr(data-label-invalid);
  }
`;

const Container = styled.div`
  font-size: 1em;
  position: relative;
  border: 0.2rem solid var(--colors__bg);
  border-radius: 0.2em;
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
