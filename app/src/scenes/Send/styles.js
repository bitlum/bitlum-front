/**
 * Send scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import SendPaymentCommon from 'components/SendPayment';

import { Header as HeaderRaw } from 'components/common';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Header = styled(HeaderRaw)`
  background: var(--colors__bg);
  font: var(--fonts__header_thin);
  height: var(--sizing__header_heigh);
  border-bottom: 0.05em solid var(--colors__bg_dark);
`;


export const SendPayment = styled(SendPaymentCommon)`
  width: 400px;
  padding: 2em;
`;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
