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

import { Img, P, Header as HeaderRaw, withLoader } from 'components/common';

import BalanceSummaryRaw from 'components/BalanceSummary';
import PaymentsGroupRaw from 'components/PaymentsGroup';

import LogoFull from 'assets/img/logo/full.png';
import { ReactComponent as EmptyIconRaw } from 'assets/icons/paper.svg';
import { ReactComponent as ErrorIconRaw } from 'assets/icons/x-circle.svg';


// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const Logo = styled(Img).attrs({
  src: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
})`
  position: relative;
  content: url(${LogoFull});
  height: 2em;
  width: 9em;
`;

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

export const ErrorIcon = styled(ErrorIconRaw)`
  margin-bottom: 3rem;
  height: 15rem;
  opacity: 0.3;
`;

export const Header = styled(HeaderRaw)`
  background: var(--colors__bg_bright);
  height: var(--sizing__header_heigh);
  & ${Logo} {
    margin: 1em;
    margin-left: 1.5em;
  }
`;

export const HeaderSecondary = styled(HeaderRaw)`
  height: var(--sizing__header_heigh);
  font: var(--fonts__header_thin);
`;

export const BalanceSummary = styled(BalanceSummaryRaw)`
  margin: 10rem 0;
  height: 21.5rem;
`;

export const Legend = styled.div`
  display: flex;
  font-size: 0.8em;
  margin-bottom: 1em;
  & + ${Separator} {
    margin-top: 1em;
  }
`;

export const LegendItem = styled.p`
  margin-left: 2em;

  &:first-child {
    margin-left: 1em;
  }

  position: relative;
  &:before {
    position: absolute;
    left: -1em;
    top: calc(50% - 0.22em);
    display: block;
    content: '';
    color: transparent;
    height: 0.5em;
    width: 0.5em;
    background-color: ${({ type }) => `var(--colors__bg_${type})`};
  }
`;

export const EmptyWrapper = styled.div``;

export const Root = withLoader(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5em;

  & ${PaymentsGroup}, & ${BalanceSummary}, & ${Separator}, & ${HeaderSecondary}, & ${Legend} {
    margin-left: 2rem;
    margin-right: 2rem;
    width: calc(100vw - 4rem);
  }

  ${({ empty }) =>
    empty &&
    `& > ${EmptyWrapper} {
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
`);

export default Root;
