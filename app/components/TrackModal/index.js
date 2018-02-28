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
import AlbumCover from 'components/AlbumCover';
import ArtistsList from 'components/ArtistsList';
import Progress from 'components/Progress';
import Ul, { Li } from 'components/Ul';

import messages from './messages';
import ModalHeading from './Heading';

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
        <A href={track.album.uri}>
          <AlbumCover floatRight src={track.album.images[1].url} />
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
