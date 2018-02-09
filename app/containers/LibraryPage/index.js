import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {
  makeSelectError,
  makeSelectLoading,
  makeSelectLibrary,
} from 'containers/App/selectors';
import { loadLibrary, exportCSV } from 'containers/App/actions';
import H1 from 'components/H1';
import A from 'components/A';
import Section from 'components/Section';
import AlbumCover from 'components/AlbumCover';
import Duration from 'components/Duration';
import DateTime from 'components/DateTime';
import Button from 'components/Button';
import { isLoggedIn } from 'utils/auth';

import messages from './messages';

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
  componentDidMount() {
    if (isLoggedIn() && !this.props.library) {
      this.props.onGetLibrary();
    }
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <Helmet>
          <title>Library Page</title>
          <meta name="description" content={formatMessage(messages.header)} />
        </Helmet>

        <Section>
          <H1>
            <FormattedMessage {...messages.header} />
          </H1>
        </Section>

        <Section>
          <ReactTable
            data={this.props.library}
            loading={this.props.loading}
            defaultPageSize={20}
            columns={columns}
            filterable
            loadingText={formatMessage(messages.libraryLoading)}
            noDataText={formatMessage(messages.libraryEmpty)}
            defaultSorted={[
              {
                id: 'addedAt',
                desc: true,
              },
            ]}
            className="-striped -highlight"
          />
        </Section>

        <Section>
          <Button
            onClick={() => this.props.onExportCsv(this.props.library)}
            disabled={this.props.loading || !this.props.library}
          >
            <FormattedMessage {...messages.exportCsv} />
          </Button>
        </Section>
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
  onExportCsv: PropTypes.func,
  library: PropTypes.array,
  intl: PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
    onGetLibrary: (page, pageSize) => dispatch(loadLibrary(page, pageSize)),
    onExportCsv: items => dispatch(exportCSV(items)),
  };
}

const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(LibraryPage);
