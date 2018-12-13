/**
 * Component to display childs with custom color and background
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export const Message = styled.div`
  word-break: break-word;
  border-radius: 0.2em;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0.85em 1.3em;
  font-size: 1em;
  color: ${({ type }) => `var(--colors__text_${type})`};
  background-color: ${({ type }) => `var(--colors__bg_${type})`};
`;

export default Message;
