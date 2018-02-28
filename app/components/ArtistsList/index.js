import React from 'react';
import PropTypes from 'prop-types';

import A from 'components/A';
import Ul, { Li } from 'components/Ul';

function ArtistsList({ artists, isLinks }) {
  return (
    <Ul clean>
      {artists.map((artist, index) => (
        <Li inline key={artist.id}>{index ? ', ' : ''}{isLinks ? (<A href={artist.uri}>{artist.name}</A>) : artist.name}</Li>
      ))}
    </Ul>
  );
}

ArtistsList.propTypes = {
  artists: PropTypes.array,
  isLinks: PropTypes.bool,
};

export default ArtistsList;
