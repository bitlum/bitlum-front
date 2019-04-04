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
  color: ${({ primary }) => (primary ? 'var(--colors__text_accent)' : 'var(--colors__bg_accent)')};
  background-color: ${({ primary }) => (primary ? 'var(--colors__bg_accent)' : null)};
  border: ${({ link }) => (link ? 'none' : '0.1em solid var(--colors__bg_accent)')};
  font-weight: 600;
  text-align: center;
  ${({ external, children }) =>
    external &&
    children &&
    `:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26" version="1.1" width="0.65em" height="0.65em"><g fill="#0f7aff" id="surface1"><path d="M 12.3125 0 C 10.425781 0.00390625 10.566406 0.507813 11.5625 1.5 L 14.78125 4.71875 L 9.25 10.25 C 8.105469 11.394531 8.105469 13.230469 9.25 14.375 L 11.6875 16.78125 C 12.832031 17.921875 14.667969 17.925781 15.8125 16.78125 L 21.34375 11.28125 L 24.5 14.4375 C 25.601563 15.539063 26 15.574219 26 13.6875 L 26 3.40625 C 26 -0.03125 26.035156 0 22.59375 0 Z M 4.875 5 C 2.183594 5 0 7.183594 0 9.875 L 0 21.125 C 0 23.816406 2.183594 26 4.875 26 L 16.125 26 C 18.816406 26 21 23.816406 21 21.125 L 21 14.75 L 18 17.75 L 18 21.125 C 18 22.160156 17.160156 23 16.125 23 L 4.875 23 C 3.839844 23 3 22.160156 3 21.125 L 3 9.875 C 3 8.839844 3.839844 8 4.875 8 L 8.3125 8 L 11.3125 5 Z "/></g></svg>');
    fill: red;
    margin: 0 0.3em;
  }`};
  ${({ disabled }) =>
    disabled &&
    `pointer-events: none;
     opacity: 0.5;
     background-color: var(--colors__bg_dark);
     border-color: var(--colors__bg_dark);`}
`;

export default Button;
