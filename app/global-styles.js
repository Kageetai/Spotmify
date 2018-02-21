import { createGlobalStyle } from 'styled-components';

export const colors = {
  primary: '#1ED760',
  primaryHover: '#2EBD59',
};

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
`;

export default GlobalStyle;

export const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '640px',
    height: '480px',
    maxHeight: '100%',
    maxWidth: '100%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    border: `1px solid ${colors.primary}`,
    borderRadius: '4px',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    outline: 'none',
    background: '#fafafa',
    boxShadow: '0 0 5px #ccc',
  },
};
