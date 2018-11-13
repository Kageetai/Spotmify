import styled from 'styled-components';

import { colors } from 'global-styles';

const Progress = styled.div`
  display: inline-block;
  width: 250px;
  height: 1em;

  background-color: #e5e5e5;
  border-radius: 3px;
  vertical-align: middle;

  border: 0;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    height: 100%;
    background-color: ${colors.primary};
    width: ${props => (props.value ? `${props.value * 100}%` : 0)};
  }
`;

export default Progress;
