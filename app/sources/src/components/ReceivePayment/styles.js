/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import styled from 'styled-components';
import QRcodeCommon from 'qrcode.react';

import {
  withLoader,
  Form,
  CopyButton as CopyButtonRaw,
  Span,
  P,
  Message,
  Button,
} from 'components/common';

import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import completedIcon from 'assets/icons/check-circle.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const CopyButton = styled(({ data, className, inline, copiedText, copyText }) => (
  <CopyButtonRaw className={className} copyData={data} copiedText={copiedText} copyText={copyText}>
    {!inline ? <CopyIcon /> : null}
  </CopyButtonRaw>
))`
  font: var(--fonts__text);
  font-size: 0.7em;
  &:hover {
    color: var(--colors__bg_accent);
  }
  & svg {
    height: 1.8em;
    width: 1.8em;
  }
  margin-top: -0.2em;
  margin-left: ${({ inline }) => (inline ? '0' : '0.6em')};
`;

export const AssetSelector = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--colors__bg);
  z-index: 10;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const AssetItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 2rem;
  margin-right: 2rem;
  width: calc(100vw - 4rem);
  background-color: var(--colors__bg_bright);
  border-radius: 0.2em;
  overflow: hidden;
  margin-bottom: 0.3rem;
`;

export const QRcode = styled(QRcodeCommon)`
  align-self: center;
  max-width: 100vw;
`;

export const Footer = styled.div`
  margin-top: auto;
  width: 100%;
  height: 4em;
  white-space: pre;
  & ${P} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-top: 0.05em solid var(--colors__bg_dark);
  }
  & > * {
    width: 100%;
    height: 100%;
    border-radius: unset;
  }

  & ${Span}:first-child {
    word-break: break-word;
    margin-bottom: 0.5em;
    font-size: 0.6em;
    color: var(--colors__text_dark);
  }

  & ${Span}:last-child {
    font: var(--fonts__text_bold);
    cursor: pointer;
    font-size: 0.8em;
    color: var(--colors__bg_accent);
  }
`;

export const SwitchDenomination = styled(Button)`
  position: absolute;
  background: var(--colors__bg);
  color: var(--colors__bg_dark);
  border: none;
  border-radius: unset;
  width: 4.5em;
  min-width: fit-content;
  font: var(--fonts__text);
  right: 0;
`;

export const AmountInput = styled.input`
  font: var(--fonts__text_thin);
  font-size: 1em;
  border: none;
  border-radius: unset;
  text-align: center;
  padding: 0.3em 0;
  padding-right: 1em;
  margin-left: 0.2em;
  max-width: 7em;
  min-width: 2.2em;
  &::placeholder {
    padding-left: 0.6em;
  }
  width: ${({ length }) => `${(length || 0) * 1}em`};
`;

export const AmountInputWraper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  font: var(--fonts__text_thin);
  font-size: 2.3em;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    display: block;
    height: 0.02em;
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(213, 210, 210, 0) 0%,
      var(--colors__bg_dark) 50%,
      rgba(213, 210, 210, 0) 100%
    );
  }
`;

export const SendResult = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: var(--colors__bg_bright);
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 10;
  & > ${P} {
    font: var(--fonts__header_bold);
    color: var(--colors__bg_completed);
  }
`;

export const ReceiveResult = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: var(--colors__bg_bright);
  position: absolute;
  top: 0;
  width: 100vw;
  white-space: pre;
  z-index: 10;
  & > ${P} {
    font: var(--fonts__header_bold);
    color: var(--colors__bg_dark);
  }
  & ${CopyButton} {
    font-size: 1.2em;
    padding-top: 0.5em;
  }
`;

export const SendResultIcon = styled.div`
  background-image: url(${completedIcon});
  height: 8em;
  width: 8em;
  background-color: var(--colors__bg_completed);
  background-repeat: no-repeat;
  border-radius: 50%;
  background-size: 60%;
  background-position: center;
  margin-top: 6em;
  margin-bottom: 2em;
`;

export const ReceiveResultIcon = styled.div`
  background-image: url(${completedIcon});
  height: 8em;
  width: 8em;
  background-color: var(--colors__bg_dark);
  background-repeat: no-repeat;
  border-radius: 50%;
  background-size: 60%;
  background-position: center;
  margin-top: 6em;
  margin-bottom: 2em;
`;

export const SendResultDesc = styled.p`
  color: var(--colors__bg_dark);
  font-size: 0.8em;
  max-width: 90%;
  word-break: break-word;
  margin-top: 1em;
`;
export const SendResultCta = styled.a`
  color: var(--colors__bg_accent);
  font-size: 0.8em;
  margin-top: 1em;
`;

export const Root = withLoader(styled(Form)`
  position: relative;
  background-color: var(--colors__bg_bright);
  height: 100%;
  & > ${P} {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 1em;
  }
  & > ${P} ${Span} {
    max-width: 14em;
    display: block;
    font-size: 0.8em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & ${Message}:first-child {
    white-space: pre;
    justify-content: center;
    font-size: 0.7em;
    text-align: center;
    margin-bottom: 5em;
    color: var(--colors__text_dark);
  }
`);

export default Root;
