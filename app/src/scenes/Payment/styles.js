/**
 * Payments scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { P, Header as HeaderRaw } from 'components/common';

import { ReactComponent as ErrorIconRaw } from 'assets/icons/x-circle.svg';
import { ReactComponent as EmptyIconRaw } from 'assets/icons/paper.svg';

import PaymentDetailsRaw from 'components/PaymentDetails';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Header = styled(HeaderRaw)`
  height: var(--sizing__header_heigh);
  font: var(--fonts__header_thin);
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: var(--colors__bg);
`;

export const PaymentDetails = styled(PaymentDetailsRaw)`
  margin-top: var(--sizing__header_heigh);
`;

export const EmptyIcon = styled(EmptyIconRaw)`
  margin-bottom: 3rem;
  height: 15rem;
  width: 15rem;
  opacity: 0.3;
`;
export const ErrorIcon = styled(ErrorIconRaw)`
  margin-bottom: 3rem;
  height: 15rem;
  width: 15rem;
  opacity: 0.3;
`;

export const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  font-size: 2em;
  text-align: center;
  margin-top: 2em;
  margin-top: var(--sizing__header_heigh);
  & svg {
    stroke: #000;
  }
`;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Root;
