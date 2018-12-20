/**
 * Component to display name and button for name generation
 *
 */

// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

import styled from 'styled-components';

import { withLoader, Form, Span, P, Input, Img, Button } from 'components/common';

import BalanceSummaryRaw from 'components/BalanceSummary';

import completedIcon from 'assets/icons/check-circle.svg';
import pendingIcon from 'assets/icons/clock.svg';
import failedIcon from 'assets/icons/x-circle.svg';

// -----------------------------------------------------------------------------
// Code
// -----------------------------------------------------------------------------

export * from 'components/common';

export const BalanceSummary = styled(BalanceSummaryRaw)`
  font: var(--fonts__text);
  font-size: 0.8em;
  & > * {
    font: var(--fonts__text);
    font-size: 1em;
  }
  & > ${P} {
    padding-top: 0.2em;
  }
  margin-top: 1em;
  margin-bottom: auto;
`;

export const Submit = styled(Button)`
  border-radius: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.7em 0;
  & ${Span}:first-child {
    font: var(--fonts__text_bold);
    font-size: 1.1em;
    margin-bottom: 0.4em;
  }
  & ${Span} {
    font: var(--fonts__text);
    font-size: 1em;
  }
`;

export const SwitchDenomination = styled(Button)`
  background: var(--colors__bg);
  color: var(--colors__bg_dark);
  border: none;
  border-radius: unset;
  width: 4.5em;
  min-width: fit-content;
  font: var(--fonts__text);
`;

export const Fees = styled(P)`
  font: var(--fonts__text);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--colors__bg);
  padding: 1em 0;
  font-size: 0.8em;
  & ${Span}:first-child {
    margin-bottom: 0.2em;
  }
`;

export const Description = styled(P)`
  position: relative;
  font: var(--fonts__text);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--colors__bg);
  padding: 1em 0;
  font-size: 0.8em;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    display: block;
    height: 0.05em;
    width: 50%;
    background: var(--colors__bg_dark);
  }

  & ${Span}:first-child {
    margin-bottom: 0.6em;
  }
  & ${Span}:last-child {
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    max-width: 90%;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8em;
    color: var(--colors__text_dark);
  }
`;

export const Vendor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 1em;
  padding-bottom: 1em;
  width: 100%;
  background: var(--colors__bg);
  & > ${Img} {
    background: #e3aff9;
    border-radius: 50%;
    height: 2.7em;
    width: 2.7em;
    padding: 0.3em;
    margin-bottom: 0.7em;
  }
  & > ${P} {
    flex-direction: column;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & ${P}:last-child {
    margin-top: 0.2em;
    font-size: 0.8em;
    color: var(--colors__text_bright);
    max-width: 14em;
  }
`;

export const AmountInput = styled.input`
  font: var(--fonts__text_thin);
  width: 100%;
  border: none;
  border-radius: unset;
  text-align: center;
  font-size: 2.3em;
  padding: 0.3em 0;
  padding-left: 1.65em;
  &::placeholder {
    padding-left: 0.9em;
  }
`;

export const AmountInputWraper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border-top: 0.05em solid var(--colors__bg_dark);
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    display: block;
    height: 0.05em;
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(213, 210, 210, 0) 0%,
      var(--colors__bg_dark) 50%,
      rgba(213, 210, 210, 0) 100%
    );
  }
`;

export const Done = styled(Button)`
  border-radius: unset;
  padding: 1em 0;
  font: var(--fonts__text_bold);
  font-size: 1.1em;
  margin-top: auto;
  width: 100%;
`;

export const SendResult = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  background: var(--colors__bg_bright);
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  & > ${P} {
    font: var(--fonts__header_bold);
    color: ${({ status }) => `var(--colors__bg_${status})`};
  }
`;

export const SendResultIcon = styled.div`
  background-image: url(${({ status }) =>
    status === 'failed' ? failedIcon : status === 'pending' ? pendingIcon : completedIcon});
  height: 8em;
  width: 8em;
  background-color: ${({ status }) => `var(--colors__bg_${status})`};
  background-repeat: no-repeat;
  border-radius: 50%;
  background-size: 60%;
  background-position: center;
  margin-top: 8em;
  margin-bottom: 2em;
`;

export const SendResultDesc = styled.p`
  color: var(--colors__bg_dark);
  font-size: 0.8em;
  max-width: 90%;
  word-break: break-word;
  margin-top: 1em;
`;
export const SendResultCta = styled.a`
  color: var(--colors__bg_accent);
  font-size: 0.8em;
  margin-top: 1em;
`;

export const Root = withLoader(styled(Form)`
  flex-grow: 2;

  & > ${Span} {
    word-break: initial;
    font-size: 0.8em;
    opacity: 0.8;
  }
`);

export default Root;
