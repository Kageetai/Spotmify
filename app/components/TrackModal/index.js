/**
*
* TrackModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import Modal from 'react-modal';
// import styled from 'styled-components';

import { makeSelectTrack, makeSelectError, makeSelectLoading } from 'containers/App/selectors';
import { loadTrack } from 'containers/App/actions';
import A from 'components/A';

import messages from './messages';

class TrackModal extends React.PureComponent {
  componentDidMount() {
    if (this.props.id) {
      this.props.onGetTrack(this.props.id);
    }
  }

  render() {
    const { track, loading, error } = this.props;

    if (error) {
      return <FormattedMessage {...messages.error} />;
    }

    if (loading) {
      return <FormattedMessage {...messages.loading} />;
    }

    return (
      <Modal
        isOpen={!!track}
        onRequestClose={this.props.onClose}
        contentLabel="Modal"
      >
        <div>
          <A href={track.uri}><h1>{track.name}</h1></A>
          <span>{track.artists[0].name}</span>
        </div>
      </Modal>
    );
  }
}

TrackModal.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onGetTrack: PropTypes.func,
  onClose: PropTypes.func,
  track: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onGetTrack: id => dispatch(loadTrack(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  track: makeSelectTrack(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(TrackModal);
