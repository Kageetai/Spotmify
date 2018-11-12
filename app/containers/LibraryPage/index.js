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

import injectSaga from 'utils/injectSaga';
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

import messages from './messages';
import List from './List';
import ListItem from './ListItem';
import { isLoggedIn } from '../../utils/auth';

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
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <FormattedMessage {...messages.libraryTotal} values={{ count: this.props.libraryTotal }} />
        <List>
          {this.props.library && this.props.library.map((item) => {
            const { track } = item;
            const artist = track.artists[0];
            return (
              <ListItem key={track.id}>{artist.name} - {track.name}</ListItem>
            );
          })}
        </List>
        <div><Button onClick={this.loadMore}>Load more</Button></div>
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
