/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import React from 'react';
import styled from 'styled-components';

import {
  CopyButton as CopyButtonRaw,
  Button as ButtonRaw,
  P,
  Span as SpanRaw,
  Img,
  Tip,
} from 'components/common';

import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const CopyButton = styled(({ data, className }) => (
  <CopyButtonRaw className={className} copyData={data}>
    <CopyIcon />
  </CopyButtonRaw>
))`
  position: absolute;
  right: -3.5em;
  top: -0.12em;
  font: var(--fonts__text);
  font-size: 0.7em;
  &:hover {
    color: var(--colors__bg_accent);
  }
  & svg {
    height: 1.8em;
    width: 1.8em;
  }
`;

export const Span = styled(SpanRaw)`
  word-break: break-word;
  ${({ unreadable }) =>
    unreadable &&
    `
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 11em;
 `}
`;

export const Vendor = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.9em;
  margin-top: 1.8em;
  margin-bottom: 1.8em;
  width: 100%;
  font-size: 0.8em;
  & > ${Img} {
    background: ${({ color }) => color || '#fff'};
    padding: ${({ color }) => color && '0.4em'};
    border-radius: 0.3em;
    height: 2.7em;
    width: 2.7em;
  }
  & > ${P} {
    margin-left: 1.5em;
    display: flex;
    flex-direction: column;
    max-width: 14em;
  }
  & ${Span} {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & ${Span}:last-child {
    margin-top: 0.6em;
    font-size: 0.8em;
    color: var(--colors__text_bright);
  }
`;

export const Status = styled.div`
  margin-left: auto;
  font-size: 0.8em;
  text-align: right;
  padding-right: 5.6em;
  height: 1.8em;
  border-bottom: 0.15em solid ${({ status }) => `var(--colors__bg_${status})`};
`;

export const Details = styled.div`
  padding-left: 3.7em;
  padding-right: 3.7em;
  width: 100%;
`;

export const DetailsItem = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1em;
  & ${Tip} {
    margin-right: 0.5em;
  }
  & ${P} {
    font-size: 0.8em;
    display: flex;
    flex-direction: column;
    align-items: ${({ align }) => (align === 'left' ? 'flex-start' : 'flex-end')};
  }

  & ${P}:first-child {
    font: ${({ accent }) => (accent ? 'var(--fonts__text_bold)' : 'var(--fonts__text)')};
    font-size: 0.8em;
    align-items: flex-start;
    min-width: 8em;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &:not(:last-child) {
    border-bottom: 0.05em solid var(--colors__bg_dark);
    padding-bottom: 1em;
  }

  & ${P} ${Span}:first-of-type {
    font: ${({ accent }) => (accent ? 'var(--fonts__text_bold)' : 'var(--fonts__text)')};
    margin-bottom: 0.3em;
  }

  & ${P} ${Span}:last-of-type {
    font-size: 0.8em;
    color: var(--colors__text_bright);
  }

  & ${P} ${Span}:first-of-type {
    font-size: 1em;
  }

  & ${P}:last-child {
    color: ${({ direction }) => direction === 'incoming' && 'var(--colors__text_ok)'};
  }
`;

export const Button = styled(ButtonRaw)`
  align-self: flex-start;
  margin-top: 0.8em;
`;

export const MainInfo = styled.div`
  background-color: var(--colors__bg_bright);
  border-bottom: 0.05em solid var(--colors__bg_dark);
  margin-bottom: 1em;
`;

export const AdditionalInfo = styled.div``;

export const Root = styled.div`
  display: flex;
  flex-direction: column;

  & ${MainInfo}, & ${AdditionalInfo} {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export default Root;
