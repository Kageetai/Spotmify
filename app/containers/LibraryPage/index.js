/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import injectSaga from 'utils/injectSaga';
import { isLoggedIn } from 'utils/auth';
import {
  makeSelectAccessToken,
  makeSelectError,
  makeSelectLoading,
  makeSelectLibrary,
  makeSelectLibraryTotal,
} from 'containers/App/selectors';
import { loadLibrary } from 'containers/App/actions';
import saga from 'containers/App/saga';
import H1 from 'components/H1';
import Button from 'components/Button';
import A from 'components/A';
import Section from 'components/Section';

import messages from './messages';
import AlbumCover from './AlbumCover';

class LibraryPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
  }

  componentWillMount() {
    if (isLoggedIn()) {
      this.props.onGetLibrary();
    }
  }

  loadMore(evt) {
    evt.preventDefault();
    this.props.onGetLibrary();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Library Page</title>
          <meta name="description" content="Your Spotify library" />
        </Helmet>

        <Section>
          <H1>
            <FormattedMessage {...messages.header} />
          </H1>
          <FormattedMessage {...messages.libraryTotal} values={{ count: this.props.libraryTotal }} />
        </Section>

        <ReactTable
          data={this.props.library}
          columns={[
            {
              Header: 'Name',
              id: 'trackName',
              accessor: i => i.track.name,
              Cell: row => (
                <A href={row.original.track.uri}>{row.value}</A>
              ),
            },
            {
              Header: 'Artist',
              id: 'artist',
              accessor: i => i.track.artists[0].name,
              Cell: row => (
                <A href={row.original.track.artists[0].uri}>{row.value}</A>
              ),
            },
            {
              Header: 'Album',
              id: 'album',
              accessor: i => i.track.album.name,
              Cell: row => (
                <A href={row.original.track.album.uri}>{console.log(row.original)}
                  <AlbumCover src={row.original.track.album.images[2].url} />{row.value}
                </A>
              ),
            },
            {
              Header: 'Duration',
              id: 'duration',
              accessor: i => i.track.duration_ms,
            },
            {
              Header: 'Added At',
              id: 'addedAt',
              accessor: 'added_at',
            },
            {
              Header: 'Popularity',
              id: 'popularity',
              accessor: i => i.track.popularity,
            },
          ]}
          defaultSorted={[
            {
              id: 'addedAt',
              desc: true,
            },
          ]}
          defaultPageSize={50}
          className="-striped -highlight"
        />
        <Button onClick={this.loadMore}>Load more</Button>
      </div>
    );
  }
}

LibraryPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onGetLibrary: PropTypes.func,
  accessToken: PropTypes.string,
  library: PropTypes.array,
  libraryTotal: PropTypes.number,
};

export function mapDispatchToProps(dispatch) {
  return {
    onGetLibrary: () => dispatch(loadLibrary()),
  };
}

const mapStateToProps = createStructuredSelector({
  accessToken: makeSelectAccessToken(),
  library: makeSelectLibrary(),
  libraryTotal: makeSelectLibraryTotal(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withSaga,
  withConnect,
)(LibraryPage);
