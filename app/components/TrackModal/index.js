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

import { makeSelectTrack, makeSelectError, makeSelectTrackLoading } from 'containers/App/selectors';
import { loadTrack } from 'containers/App/actions';
import A from 'components/A';
import AlbumCover from 'components/AlbumCover';
import ArtistsList from 'components/ArtistsList';
import Progress from 'components/Progress';
import Ul, { Li } from 'components/Ul';

import messages from './messages';
import ModalHeading from './Heading';

class TrackModal extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    if (nextProps.id && !this.props.loading) {
      this.props.onGetTrack(nextProps.id);
    }
  }

  render() {
    const { id, track, loading, error } = this.props;

    return (
      <Modal
        isOpen={!!id}
        onRequestClose={this.props.onClose}
        contentLabel="Modal"
      >
        {loading ? <FormattedMessage {...messages.loading} /> : null}
        {error ? <FormattedMessage {...messages.error} /> : null}
        {!loading && track ? (
          <div>
            <A href={track.album.uri}>
              {track.album.images.length ? (
                <AlbumCover floatRight src={track.album.images[1].url} />
              ) : track.album.name}
            </A>
            <A href={track.uri}><ModalHeading>{track.name}</ModalHeading></A>
            <ArtistsList isLinks artists={track.artists} />

            <Ul clean>
              <Li clean><FormattedMessage {...messages.acousticness} />: <Progress value={track.acousticness} /></Li>
              <Li clean><FormattedMessage {...messages.danceability} /> <Progress value={track.danceability} /></Li>
              <Li clean><FormattedMessage {...messages.energy} /> <Progress value={track.energy} /></Li>
              <Li clean><FormattedMessage {...messages.instrumentalness} /> <Progress value={track.instrumentalness} /></Li>
              <Li clean><FormattedMessage {...messages.liveness} /> <Progress value={track.liveness} /></Li>
              <Li clean><FormattedMessage {...messages.speechiness} /> <Progress value={track.speechiness} /></Li>
              <Li clean><FormattedMessage {...messages.valence} /> <Progress value={track.valence} /></Li>
            </Ul>
          </div>
        ) : null}
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
  loading: makeSelectTrackLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(TrackModal);
