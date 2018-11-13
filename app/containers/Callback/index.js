import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import { getTokens } from 'containers/App/actions';

export class Callback extends React.PureComponent {
  componentWillMount() {
    this.props.onGetTokens();
  }

  render() {
    return <Redirect to="/" />;
  }
}

Callback.propTypes = {
  onGetTokens: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onGetTokens: () => dispatch(getTokens()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Callback);
