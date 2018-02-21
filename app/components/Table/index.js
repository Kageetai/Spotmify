import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import Modal from 'react-modal';

import AlbumCover from 'components/AlbumCover';
import Duration from 'components/Duration';
import DateTime from 'components/DateTime';
import A from 'components/A';

class Table extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedItem: {
        track: {},
      },
    };

    this.columns = [
      {
        Header: 'Name',
        id: 'trackName',
        accessor: i => i.track.name,
        Cell: row => <A onClick={() => this.openModal(row.original)}>{row.value}</A>,
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

    this.openModal = this.openModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  openModal(item) {
    this.setState({
      isModalOpen: true,
      selectedItem: item,
    });
  }

  hideModal() {
    this.setState({
      isModalOpen: false,
    });
  }

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.data}
          loading={this.props.loading}
          defaultPageSize={20}
          columns={this.columns}
          filterable
          loadingText={this.props.loadingText}
          noDataText={this.props.noDataText}
          defaultSorted={[
            {
              id: 'addedAt',
              desc: true,
            },
          ]}
          className="-striped -highlight"
        />

        {this.state.selectedItem && (
          <Modal
            isOpen={this.state.isModalOpen}
            onRequestClose={this.hideModal}
            contentLabel="Modal"
          >
            <A href={this.state.selectedItem.track.uri}><h1>{this.state.selectedItem.track.name}</h1></A>
          </Modal>
        )}
      </div>
    );
  }
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  noDataText: PropTypes.string,
};

export default Table;
