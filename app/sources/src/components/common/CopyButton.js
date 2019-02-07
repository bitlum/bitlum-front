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

export const CopyButton = styled(
  ({ copyData, copyText = 'Copy', copiedText = 'Copied!', children, ...rest }) => (
    <div
      onClick={e => {
        const copyContainer = document.createElement('input');
        copyContainer.value = copyData;
        document.body.appendChild(copyContainer);
        copyContainer.select();
        document.execCommand('Copy');
        copyContainer.remove();
        const button = e.currentTarget;
        button.setAttribute('data-afterText', copiedText);
        setTimeout(() => {
          button.setAttribute('data-afterText', copyText);
        }, 800);
      }}
      data-afterText={copyText}
      {...rest}
    >
      {children}
    </div>
  ),
)`
  position: relative;
  font-size: 1em;
  border-radius: 0.2em;
  font-weight: 600;
  text-align: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  grid-template-columns: 1fr;
  &:after {
    content: attr(data-afterText);
    position: absolute;
    font-size: 0.8em;
    bottom: -1.5em;
    left: 50%;
    right: 50%;
    transform: translate(-50%);
    word-break: initial;
    width: max-content;
    transition: opacity 0.3s ease-in-out;
  }
`;

export default CopyButton;
