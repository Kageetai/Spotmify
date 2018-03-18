import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { List } from 'immutable';

import AlbumCover from 'components/AlbumCover';
import Duration from 'components/Duration';
import DateTime from 'components/DateTime';
import A from 'components/A';
import TrackModal from 'components/TrackModal';
import ArtistsList from 'components/ArtistsList';

class Table extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedTrack: {},
    };

    this.columns = [
      {
        Header: 'Name',
        id: 'trackName',
        accessor: i => i.track.name,
        Cell: row => <A onClick={() => this.setTrack(row.original)}>{row.value}</A>,
      },
      {
        Header: 'Artist',
        id: 'artist',
        accessor: i => i.track.artists[0].name,
        Cell: row => <ArtistsList artists={row.original.track.artists} isLinks />,
      },
      {
        Header: 'Album',
        id: 'album',
        accessor: i => i.track.album.name,
        Cell: row => (
          <A href={row.original.track.album.uri}>
            <AlbumCover table src={row.original.track.album.images[2].url} />{row.value}
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
        Header: 'Popularity',
        id: 'popularity',
        width: 90,
        accessor: i => i.track.popularity,
      },
      {
        Header: 'Explicit',
        id: 'explicit',
        width: 70,
        accessor: i => i.track.explicit,
        Cell: row => <span>{row.value ? 'yes' : 'no'}</span>,
      },
      {
        Header: 'Added At',
        id: 'addedAt',
        accessor: 'added_at',
        Cell: row => <DateTime timestamp={row.value} />,
      },
    ];

    this.setTrack = this.setTrack.bind(this);
    this.unsetTrack = this.unsetTrack.bind(this);
  }

  setTrack(track) {
    this.setState({
      selectedTrack: track,
    });
  }

  unsetTrack() {
    this.setState({
      selectedTrack: {},
    });
  }

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.data.toJS()}
          loading={this.props.loading}
          defaultPageSize={20}
          columns={this.columns}
          filterable
          loadingText={this.props.loadingText}
          noDataText={this.props.loading ? '' : this.props.noDataText}
          defaultSorted={[
            {
              id: 'addedAt',
              desc: true,
            },
          ]}
          className="-striped -highlight"
        />

        <TrackModal
          id={this.state.selectedTrack && this.state.selectedTrack.track && this.state.selectedTrack.track.id}
          onClose={this.unsetTrack}
        />
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.instanceOf(List),
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  noDataText: PropTypes.string,
};

export default Table;
