import { css } from 'styled-components';

import { colors } from 'global-styles';

const buttonStyles = css`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid ${colors.primary};
  color: ${colors.primary};

  &:active {
    background: ${colors.primary};
    color: #fff;
  }
`;

export default buttonStyles;
