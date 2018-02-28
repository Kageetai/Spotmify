import styled from 'styled-components';

const Ul = styled.ul`
  ${props => props.clean ? `
    list-style: none;
    margin: 0;
    padding: 0;
  ` : null}
`;

export const Li = styled.li`
  ${props => props.clean ? `
    margin: 0;
    padding: 0;
  ` : null}
  ${props => props.inline ? `
    display: inline;
  ` : null}
`;

export default Ul;
