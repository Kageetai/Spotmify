/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
  makeSelectAccessToken,
  makeSelectUser,
} from 'containers/App/selectors';
import { loadRepos, loadUser, deleteTokens } from 'containers/App/actions';
import appSaga from 'containers/App/saga';
import Button from 'components/Button';
import UserProfile from 'components/UserProfile';

import CenteredSection from './CenteredSection';
import messages from './messages';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class HomePage extends React.PureComponent {
  componentWillMount() {
    if (this.props.accessToken) {
      this.props.onGetUser();
    }
  }

  render() {
    const {
      loading, error, user, accessToken, onDeleteTokens,
    } = this.props;

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Spotmify homepage" />
        </Helmet>
        <CenteredSection>
          {!accessToken ? (
            <Button href="/login">
              <FormattedMessage {...messages.login} />
            </Button>
          ) : (
            <Button onClick={onDeleteTokens}>
              <FormattedMessage {...messages.logout} />
            </Button>
          )}

          {error ? (
            <FormattedMessage {...messages.login.error} />
          ) : null}

          {accessToken ? (
            <UserProfile user={user} loading={loading} error={error} />
          ) : null}
        </CenteredSection>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
  onGetUser: PropTypes.func,
  onGetTokens: PropTypes.func,
  onDeleteTokens: PropTypes.func,
  accessToken: PropTypes.string,
  user: PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onGetUser: () => dispatch(loadUser()),
    onDeleteTokens: (evt) => {
      evt.preventDefault();
      dispatch(deleteTokens());
    },
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  accessToken: makeSelectAccessToken(),
  user: makeSelectUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });
const withAppSaga = injectSaga({ key: 'app', saga: appSaga });

export default compose(
  withReducer,
  withSaga,
  withAppSaga,
  withConnect,
)(HomePage);
