/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';
import QRcodeCommon from 'qrcode.react';

import { withLoader, Form } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Root = withLoader(styled(Form)``);

export const QRcode = styled(QRcodeCommon)`
  align-self: center;
`;

export default Root;
