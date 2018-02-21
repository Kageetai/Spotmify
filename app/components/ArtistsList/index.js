import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import A from 'components/A';

const UL = styled.ul`
  text-decoration: none;
  margin: 0;
  padding: 0;
`;

const LI = styled.li`
  display: inline;
`;

function ArtistsList({ artists, isLinks }) {
  return (
    <UL>
      {artists.map((artist, index) => (
        <LI key={artist.id}>{index ? ', ' : ''}{isLinks ? (<A href={artist.uri}>{artist.name}</A>) : artist.name}</LI>
      ))}
    </UL>
  );
}

ArtistsList.propTypes = {
  artists: PropTypes.array,
  isLinks: PropTypes.bool,
};

export default ArtistsList;
