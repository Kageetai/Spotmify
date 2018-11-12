import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import A from 'components/A';
import Ul, { Li } from 'components/Ul';


export const ArtistsP = styled.div`
  margin-bottom: 1em;
`;

function ArtistsList({ artists, isLinks }) {
  return (
    <Ul clean inline>
      {artists.map((artist, index) => (
        <Li inline key={artist.id}>{index ? ', ' : ''}{isLinks ? (
          <A href={artist.uri}>{artist.name}</A>) : artist.name}</Li>
      ))}
    </Ul>
  );
}

ArtistsList.propTypes = {
  artists: PropTypes.array,
  isLinks: PropTypes.bool,
};

export default ArtistsList;
