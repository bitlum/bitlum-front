/**
 * Send scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import SendPaymentCommon from 'components/SendPayment';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const SendPayment = styled(SendPaymentCommon)`
  width: 400px;
  padding: 2em;
`;
