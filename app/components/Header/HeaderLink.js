import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from 'global-styles';

import buttonStyles from 'components/Button/buttonStyles';

export default styled(Link)`
  ${buttonStyles};
  padding: 0.25em 2em;
  margin-right: 1em;
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
