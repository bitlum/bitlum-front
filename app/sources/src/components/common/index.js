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

export const Tip2 = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  &:before {
    content: '?';
    background-color: var(--colors__bg);
    border-radius: 50%;
    width: 1em;
    height: 1em;
  }
  &:hover {
    width: fit-content;
    height: initial;
  }
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
