import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function Duration({ milliseconds }) {
  const duration = moment.duration(milliseconds);
  return (
    <div>
      {duration.minutes()}:
      {duration
        .seconds()
        .toString()
        .padStart(2, '0')}
    </div>
  );
}

Duration.propTypes = {
  milliseconds: PropTypes.number.isRequired,
};

export default Duration;
