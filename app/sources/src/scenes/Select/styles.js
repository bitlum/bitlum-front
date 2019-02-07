/**
 * Receive scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import SelectReceiveAssetRaw from 'components/SelectReceiveAsset';

import { Header as HeaderRaw, withLoader } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const SelectReceiveAsset = styled(SelectReceiveAssetRaw)`
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

export const Root = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;

export default withLoader(Root);
