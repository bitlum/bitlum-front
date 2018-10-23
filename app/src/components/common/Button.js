/**
 * Styled component for button
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const Button = styled.button`
  word-break: break-word;
  font-size: 1em;
  padding: ${({ link }) => (link ? '0' : '0.45em 1.3em')};
  border-radius: 0.2em;
  color: ${({ primary }) => (primary ? 'var(--colors-text-accent)' : 'var(--colors-bg-accent)')};
  background-color: ${({ primary }) => (primary ? 'var(--colors-bg-accent)' : null)};
  border: ${({ link }) => (link ? 'none' : '0.1em solid var(--colors-bg-accent)' )};
  font-weight: 600;
  text-align: center;
`;

export default Button;
