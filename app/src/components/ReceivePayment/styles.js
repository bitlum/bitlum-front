/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';
import QRcodeCommon from 'qrcode.react';

import { withLoader, Form, CopyButton, Span, P } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Root = withLoader(styled(Form)`

  & ${CopyButton} {
    margin-left: 1em;
  }

  & > ${P} {
    font-weight: 600;
  }

  & > ${Span} {
    word-break: initial;
    font-size: 0.8em;
    opacity: 0.8;
  }
`);

export const QRcode = styled(QRcodeCommon)`
  align-self: center;
  max-width: 50vw;
`;

export default Root;
