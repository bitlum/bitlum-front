/**
 * Styled component for button
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import styled from 'styled-components';

import { Button as ButtonCommon } from './Button';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

const CopyText = styled.p``;
export const CopyButton = styled(
  ({ copyData, copyText = 'Copy', copiedText = 'Copied!', ...rest }) => (
    <div
      link
      onClick={e => {
        const copyContainer = document.createElement('input');
        copyContainer.value = copyData;
        document.body.appendChild(copyContainer);
        copyContainer.select();
        document.execCommand('Copy');
        copyContainer.remove();
        const button = e.currentTarget;
        button.classList.add('copied');
        setTimeout(() => {
          button.classList.remove('copied');
        }, 800);
      }}
      {...rest}
    >
      <CopyText>{copyText}</CopyText>
      <CopyText>{copiedText}</CopyText>
    </div>
  ),
)`
  font-size: 1em;
  border-radius: 0.2em;
  font-weight: 600;
  text-align: center;
  display: grid;
  cursor:pointer;
  grid-template-columns: 1fr;
  & > ${CopyText} {
    grid-area: 1 / 1;
    word-break: initial;
    width: max-content;
    transition: opacity 0.3s ease-in-out;
  }

  & > ${CopyText}:last-child {
    opacity: 0;
  }

  &.copied > ${CopyText}:last-child {
    opacity: 1;
  }
  &.copied > ${CopyText}:first-child {
    opacity: 0;
  }
`;

export default CopyButton;
