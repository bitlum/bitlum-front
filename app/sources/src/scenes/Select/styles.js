/**
 * Receive scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import SelectReceiveAssetRaw from 'components/SelectReceiveAsset';

import {
  Header as HeaderRaw,
  Message as MessageRaw,
  withLoader,
  Span,
  Tip,
} from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const SelectReceiveAsset = styled(SelectReceiveAssetRaw)`
  height: 100%;
  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export const Header = styled(HeaderRaw)`
  background: var(--colors__bg);
  font: var(--fonts__header_thin);
  min-height: var(--sizing__header_heigh);
  border-bottom: 0.05em solid var(--colors__bg_dark);
`;

export const Maintenance = styled(MessageRaw)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  text-align: center;
  margin-bottom: -3.5em;
  background: var(--colors__bg_warn);
  font-weight: 400;
  z-index: 11;
  & * {
    word-break: break-word;
  }
  & > ${Span} {
    font-weight: 600;
    font-size: 1.1em;
    padding: 0 !important;
  }
  & > ${Tip} {
    margin-left: 0.5em;
  }
  & > ${Tip}:before {
    background: none;
    border: 0.1em solid black;
  }
`;

export const Root = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;

export default withLoader(Root);
