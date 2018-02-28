import styled from 'styled-components';

import { colors } from 'global-styles';

const Progress = styled.progress`
  /* Reset the default appearance */
  -webkit-appearance: none;
   appearance: none;

  width: 250px;
  height: 20px;
  
  color: ${colors.primary};
  background-color: #eee;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  vertical-align: middle;
`;

export default Progress;
