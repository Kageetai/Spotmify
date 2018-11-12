import styled from 'styled-components';

import { colors } from 'global-styles';

const Progress = styled.progress`
  /* Reset the default appearance */
  -webkit-appearance: none;
   appearance: none;

  //width: 250px;
  //height: 20px;
  
  color: ${colors.primary};
  background-color: #f3f3f3;
  border-radius: 3px;
  //box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  vertical-align: middle;
  
  border: 0;
  height: 18px;
`;

export default Progress;
