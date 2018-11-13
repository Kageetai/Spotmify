import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import styled from 'styled-components';

import pkg from '../../../package.json';

/**
 * @return {string}
 */
function DateTime({ timestamp }) {
  return <span>{moment(timestamp).format(pkg.spotify.dateformat)}</span>;
}

DateTime.propTypes = {
  timestamp: PropTypes.string,
};

export default DateTime;
