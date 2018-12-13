/**
 * Payments scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import formatDate from 'date-fns/format';
import isToday from 'date-fns/is_today';
import isYesteray from 'date-fns/is_yesterday';

import { P, Header as HeaderRaw } from 'components/common';

import BalanceSummaryRaw from 'components/BalanceSummary';
import PaymentsGroupRaw from 'components/PaymentsGroup';

import { ReactComponent as EmptyIconRaw } from 'assets/icons/paper.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Separator = styled(P)`
  font-size: 0.8em;
  margin-top: 2.5em;
  margin-bottom: 1em;
`;

export const PaymentsGroup = styled(PaymentsGroupRaw)`
  width: 100%;
  margin-bottom: 0.3rem;
`;

export const EmptyIcon = styled(EmptyIconRaw)`
  margin-bottom: 3rem;
  height: 15rem;
  opacity: 0.3;
`;

export const Header = styled(HeaderRaw)`
  height: var(--sizing__header_heigh);
  font: var(--fonts__header_thin);
`;

export const Root = styled.div`
  display: flex;
  margin: 0 1rem;
  width: calc(100vw - 2rem);
  flex-direction: column;
  justify-content: center;

  ${({ empty }) =>
    empty &&
    `& > ${P} {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      font-size: 2em;
      text-align: center;
      margin-top: 2em;
    }
  `};
`;

export const BalanceSummary = styled(BalanceSummaryRaw)`
  margin: 10rem 0;
  height: 21.5rem;
  width: 95vw;
`;

export default Root;
