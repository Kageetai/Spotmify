/**
 * A link to a certain page, an anchor tag
 */

import styled from 'styled-components';

import { colors } from 'global-styles';

const A = styled.a`
  color: ${colors.primary};
  text-decoration: none;

  &:hover {
    color: ${colors.primaryHover};
    cursor: pointer;
  }
`;

export default A;
