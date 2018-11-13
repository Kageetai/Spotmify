import styled from 'styled-components';

const cleanUl = `
    list-style: none;
    margin: 0;
    padding: 0;
  `;

const cleanLi = `
    margin: 0;
    padding: 0;
  `;

const Ul = styled.ul`
  display: ${props => (props.inline ? 'inline' : 'initial')};
  ${props => (props.clean ? cleanUl : null)};
`;

export const Li = styled.li`
  display: ${props => (props.inline ? 'inline' : 'initial')};
  ${props => (props.clean ? cleanLi : null)};
`;

export default Ul;
