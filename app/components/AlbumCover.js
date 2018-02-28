import styled from 'styled-components';

const AlbumCover = styled.img`
  height: 150px;
  margin: 1em;
  
  ${props => props.floatRight ? `
    float: right;
    margin-top: 0;
    margin-right: 0;
  ` : null}
  
  ${props => props.table ? `
    height: 2.2em;
    margin: -7px 0.5em -7px -5px;
  ` : null}
`;

export default AlbumCover;
