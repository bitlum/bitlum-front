import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import supportIcon from 'assets/icons/message-square.svg';

export * from './Input';
export * from './Button';
export * from './CopyButton';
export * from './BackButton';
export * from './Icon';
export * from './Message';
export * from './Header';
export * from './Nav';
export * from './Form';
export * from './Select';

export const Main = styled.main``;
export const Aside = styled.aside``;
export const Footer = styled.footer``;
export const Img = styled.img``;
export const P = styled.p``;
export const A = styled.a``;
export const Span = styled.span``;
export const Div = styled.div``;
export const Pre = styled.pre``;

export const Tip = styled(({ className, id, children, ...rest } = {}) => (
  <Span data-tip="React-tooltip" data-for={id} className={className}>
    <ReactTooltip id={id} effect="solid">
      {children}
    </ReactTooltip>
  </Span>
))`
  white-space: pre-wrap;
  text-align: center;
  &:before {
    cursor: pointer;
    display: block;
    content: '?';
    background-color: var(--colors__bg_dark);
    text-align: center;
    border-radius: 50%;
    font-size: 0.8em;
    font-weight: 500;
    width: 1.3em;
    height: 1.3em;
  }
`;

export const ShareLink = styled(
  ({ className, link, copiedText = 'Copied!', copyText = 'Copy', ...rest } = {}) => (
    <Div className={className}>
      <P>Share with friends!</P>
      {/* <Span>First 5 invited will earn $0.1 bonus!</Span> */}
      <Div>
        <Span>{link}</Span>
        <button
          type="button"
          onClick={e => {
            const copyContainer = document.createElement('input');
            copyContainer.value = link;
            document.body.appendChild(copyContainer);
            copyContainer.select();
            document.execCommand('Copy');
            copyContainer.remove();
            const button = e.currentTarget;
            button.innerText = copiedText;
            setTimeout(() => {
              button.innerText = copyText;
            }, 800);
          }}
        >
          {copyText}
        </button>
      </Div>
    </Div>
  ),
)`
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  & > ${P}:first-child {
    margin-bottom: 0.5em;
  }
  & > ${P} {
    font-weight: 600;
  }
  & > ${Span} {
    font-size: 0.8em;
  }
  & > ${Div} {
    & > ${Span} {
      margin: 0 1em;
      color: var(--colors__text_dark);
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
      max-width: 13em;
    }
    & > button {
      min-width: 5em;
      font-weight: 600;
      flex-grow: 1;
      height: 100%;
      border-left: 0.15em solid var(--colors__bg_dark);
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--colors__bg_bright);
    border: 0.15em solid var(--colors__bg_dark);
    border-radius: 0.4em;
    height: 3em;
    margin-top: 0.8em;
    overflow: hidden;
  }
  white-space: pre-wrap;
  text-align: center;
`;

export const Support = styled.a`
  background: url(${supportIcon});
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: 1em;
  height: 2.5rem;
  width: 2.5rem;
`;

export * from './utils';
