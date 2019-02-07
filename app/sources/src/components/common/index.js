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
export const Tip = styled.div`
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
