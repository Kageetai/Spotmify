import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {
  makeSelectAccessToken,
  makeSelectError,
  makeSelectLoading,
  makeSelectLibrary,
  makeSelectLibraryTotal,
  makeSelectLibraryPages,
} from 'containers/App/selectors';
import { loadLibrary } from 'containers/App/actions';
import H1 from 'components/H1';
import A from 'components/A';
import Section from 'components/Section';

import messages from './messages';
import AlbumCover from '../../components/AlbumCover';
import Duration from '../../components/Duration';
import DateTime from '../../components/DateTime';

const columns = [
  {
    Header: 'Name',
    id: 'trackName',
    accessor: i => i.track.name,
    Cell: row => <A href={row.original.track.uri}>{row.value}</A>,
  },
  {
    Header: 'Artist',
    id: 'artist',
    accessor: i => i.track.artists[0].name,
    Cell: row => <A href={row.original.track.artists[0].uri}>{row.value}</A>,
  },
  {
    Header: 'Album',
    id: 'album',
    accessor: i => i.track.album.name,
    Cell: row => (
      <A href={row.original.track.album.uri}>
        <AlbumCover src={row.original.track.album.images[2].url} />{row.value}
      </A>
    ),
  },
  {
    Header: 'Duration',
    id: 'duration',
    width: 80,
    accessor: i => i.track.duration_ms,
    Cell: row => <Duration milliseconds={row.original.track.duration_ms} />,
  },
  {
    Header: 'Added At',
    id: 'addedAt',
    accessor: 'added_at',
    Cell: row => <DateTime timestamp={row.value} />,
  },
  {
    Header: 'Popularity',
    id: 'popularity',
    width: 90,
    accessor: i => i.track.popularity,
  },
];

class LibraryPage extends React.Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(state) {
    this.props.onGetLibrary(state.page, state.pageSize);
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
          manual
          data={this.props.library}
          pages={this.props.libraryPages}
          loading={this.props.loading}
          defaultPageSize={20}
          onFetchData={this.fetchData}
          columns={columns}
          sortable={false}
          // defaultSorted={[
          //   {
          //     id: 'addedAt',
          //     desc: true,
          //   },
          // ]}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

LibraryPage.propTypes = {
  loading: PropTypes.bool,
  // error: PropTypes.oneOfType([
  //   PropTypes.object,
  //   PropTypes.bool,
  // ]),
  onGetLibrary: PropTypes.func,
  // accessToken: PropTypes.string,
  library: PropTypes.array,
  libraryTotal: PropTypes.number,
  libraryPages: PropTypes.number,
};

export function mapDispatchToProps(dispatch) {
  return {
    onGetLibrary: (page, pageSize) => dispatch(loadLibrary(page, pageSize)),
  };
}

const mapStateToProps = createStructuredSelector({
  accessToken: makeSelectAccessToken(),
  library: makeSelectLibrary(),
  libraryTotal: makeSelectLibraryTotal(),
  libraryPages: makeSelectLibraryPages(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LibraryPage);
