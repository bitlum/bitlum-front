/**
 * Payments scene styles
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { NavLink } from 'react-router-dom';

import {
  Img,
  P,
  Span,
  Header as HeaderRaw,
  withLoader,
  Support as SupportRaw,
} from 'components/common';

import BalanceSummaryRaw from 'components/BalanceSummary';
import PaymentsGroupRaw from 'components/PaymentsGroup';

import LogoFull from 'assets/img/logo/full.png';
import logoutIcon from 'assets/icons/log-out.svg';
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

export const PayButton = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.2em;
  overflow: hidden;
  width: calc(100vw - 4rem);
  background: var(--colors__bg_accent);
  padding: 1.7em 0;
  font-size: 0.8em;
  margin: 3em 2rem;
  height: 5.6em;
  opacity: 0.9;
  color: var(--colors__text_accent);
  & ${Img}, & ${Span} {
    /* transition: all 0.2s ease-in; */
  }
  & ${Img} {
    opacity: 0.4;
    width: 3em;
    height: 3em;
    margin-left: 1.2em;
  }
  & ${Span} {
    font-size: 2em;
    font-weight: 600;
  }

  &:hover ${Img} {
    opacity: 0.6;
    color: blue;
  }
  &:hover {
    opacity: 1;
  }
`;

export const Support = styled(SupportRaw)`
  margin-left: 0;
`;
export const LogOut = styled.a`
  background: url(${logoutIcon});
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: 1em;
  height: 2.5rem;
  width: 2.5rem;
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
  margin-top: 2em;
  height: 20rem;
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
  margin-bottom: 1em;

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
