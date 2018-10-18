/**
 * Styled component for Form
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 1em
  }
`;

export default Form;
