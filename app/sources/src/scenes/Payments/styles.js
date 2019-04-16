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
  A,
  Button,
  Span,
  Header as HeaderRaw,
  Message as MessageRaw,
  withLoader,
  Support as SupportRaw,
  ShareLink,
  Tip,
  Div,
} from 'components/common';

import BalanceSummaryRaw from 'components/BalanceSummary';
import PaymentsGroupRaw from 'components/PaymentsGroup';

import LogoFull from 'assets/img/logo/full.png';
import settingsIcon from 'assets/icons/settings.svg';
import { ReactComponent as EmptyIconRaw } from 'assets/icons/paper.svg';
import { ReactComponent as ErrorIconRaw } from 'assets/icons/x-circle.svg';
import { ReactComponent as CloseIconRaw } from 'assets/icons/x-circle.svg';

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
  border-bottom-left-radius: 0.7em;
  border-bottom-right-radius: 0.7em;
  overflow: hidden;
  width: calc(100vw - 4rem);
  background: var(--colors__bg_accent);
  margin: 1.8em 2rem;
  margin-top: 0;
  height: 3.2em;
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
    font-size: 1.5em;
    font-weight: 600;
  }

  &:hover ${Img} {
    opacity: 0.6;
    color: blue;
  }
  &:hover {
    opacity: 1;
  }
  ${({ disabled }) =>
    disabled &&
    `pointer-events: none;
     opacity: 0.5;
     background-color: var(--colors__bg_dark);`}
`;

export const Settings = styled(NavLink)`
  background: url(${settingsIcon});
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: 1em;
  height: 2.5rem;
  width: 2.5rem;
`;

export const Support = styled(SupportRaw)`
  margin-right: 1.3em;
  margin-left: 0;
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

export const CloseIcon = styled(CloseIconRaw)`
  position: absolute;
  height: 1.4em;
  top: 0.75em;
  width: 1.4em;
  right: 0.75em;
  filter: invert(0.6);
  cursor: pointer;
`;

export const Header = styled(HeaderRaw)`
  background: var(--colors__bg_bright);
  height: var(--sizing__header_heigh);
  & ${Logo} {
    margin: 1em;
    margin-left: 1.5em;
  }
  & > *:nth-child(2) {
    margin-left: auto;
  }
`;

export const HeaderSecondary = styled(HeaderRaw)`
  height: var(--sizing__header_heigh);
  font: var(--fonts__header_thin);
`;

export const BalanceSummary = styled(BalanceSummaryRaw)`
  margin-top: 4em;
  height: 16.5rem;
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

export const Permissions = styled(MessageRaw)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  text-align: center;
  margin-bottom: -3.5em;
  background: var(--colors__bg_info);
  font-weight: 500;
  & * {
    word-break: break-word;
  }
  & > ${Button} {
    margin: 1em 0;
    font-weight: 500;
  }
  & ${Span} {
    font-weight: 600;
  }
  & ${P} {
    font-weight: normal;
    font-size: 0.8em;
  }
  & ${P} ${A} {
    font-size: 0.99em;
    font-weight: 500;
    text-decoration: underline;
  }
`;

export const Maintenance = styled(MessageRaw)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  text-align: center;
  margin-bottom: -3.5em;
  background: var(--colors__bg_warn);
  font-weight: 400;
  z-index: 10;
  & * {
    word-break: break-word;
  }
  & > ${Span} {
    font-weight: 600 !important;
    padding: 0 !important;
  }
  & > ${Tip} {
    margin-left: 0.5em;
  }
  & > ${Tip}:before {
    background: none;
    border: 0.1em solid black;
  }
`;

export const Announcement = styled(Maintenance)`
  z-index: 9;
  background: var(--colors__bg_darkenbright);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 1.3em;
  padding: 1.3em;

  & ${Div} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: initial;
  }
  & ${Div} ${Div} {
    align-items: center;
  }
  & ${Img} {
    height: 5em;
    border-radius: 50%;
    margin-right: 1.2em;
  }
  & ${Span} {
    padding-top: 0!important;
    padding-bottom: 0.35em!important;
  }
  & ${Button} {
    margin-top: 1.3em;
  }
  & ${Button}:last-child {
    margin-top: 0.4em;
    font-size: 0.8em;
    text-decoration: underline;
    color: gray;
    font-weight: 500;
  }
`;

export const Root = withLoader(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1em;
  & > ${ShareLink} {
    margin: 0 4em;
  }
  & > ${MessageRaw} {
    position: relative;
    & ${Span} {
      font-weight: 500;
      padding: 0.5em 0;
      font-size: 1.1em;
    }
    & ${A} {
      text-decoration: underline;
    }
    text-align: center;
    white-space: pre-line;
  }
  & ${PaymentsGroup}, & ${BalanceSummary}, & ${Separator}, & ${HeaderSecondary}, & ${Legend} {
    margin-left: 2rem;
    margin-right: 2rem;
    width: calc(100vw - 4rem);
  }

  ${Maintenance} + ${Announcement} {
    margin-top: 3.5em;
  }

  ${({ empty }) =>
    empty &&
    `& > ${EmptyWrapper} {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0.6;
      font-size: 1em;
      text-align: center;
      margin-top: 2em;
    }
  `};
`);

export default Root;
