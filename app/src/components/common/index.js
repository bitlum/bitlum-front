import styled from 'styled-components';

export * from './Input';
export * from './Button';
export * from './Icon';
export * from './Message';
export * from './Header';
export * from './Nav';

export const Main = styled.main``;
export const Aside = styled.aside``;
export const Footer = styled.footer``;

export const withLoader = styledComponent => styled(styledComponent)`
  opacity: ${({ loading }) => (loading ? '0.3' : '1')};
  :before {
    z-index: 1;
    content: '';
    position: absolute;
    width: 2em;
    height: 2em;
    left: calc(50% - 1em);
    bottom: calc(50% - 1em);
    background-color: #333;
    border-radius: 100%;
    animation: sk-scaleout 1s infinite ease-in-out;
    display: ${({ loading }) => (loading ? 'block' : 'none')};
  }
  & > p {
    padding: 1em;
  }
  @keyframes sk-scaleout {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;
