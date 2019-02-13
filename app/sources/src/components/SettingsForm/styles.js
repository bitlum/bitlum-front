/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';
import SelectRaw from 'react-select';

import { withLoader } from 'components/common';

import { Img, Span, P } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Select = styled(SelectRaw)`
  min-width: 7em;
`;

export const SettingsItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 2rem;
  width: calc(100vw - 4rem);
  background-color: var(--colors__bg_bright);
  border-radius: 0.2em;
  margin-bottom: 0.3rem;
  padding: 1em 1em;
  padding-right: 2em;
  margin-bottom: 0.5em;

  & > *:first-child {
    font: var(--fonts__text_bold);
  }
  & > *:last-child:not(:first-child) {
    margin-left: auto;
  }

  & ${Span} {
    word-break: break-word;
    font-size: 0.8em;
  }
`;

export const Root = styled.div`
  height: 100%;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--colors__bg);
  z-index: 10;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export default Root;
