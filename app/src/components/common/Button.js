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
  margin: 1em;
  padding: 0.45em 1.3em;
  border-radius: 0.2em;
  color: ${({ primary }) => (primary ? '#fff' : 'var(--colors-text-accent)')};
  background-color: ${({ primary }) => (primary ? 'var(--colors-bg-accent)' : null)};
  border: 0.1em solid var(--colors-bg-accent);
  font-weight: 600;
`;

export default Button;
