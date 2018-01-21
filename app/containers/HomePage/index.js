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
import { withCookies, Cookies } from 'react-cookie';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { makeSelectRepos, makeSelectLoading, makeSelectError, makeSelectUser } from '../../containers/App/selectors';
import { loadRepos, loadUser, setTokens } from '../App/actions';
import appSaga from '../App/saga';
import H2 from '../../components/H2';
import CenteredSection from './CenteredSection';
import messages from './messages';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import A from '../../components/A';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    const { cookies } = this.props;

    this.setState({
      accessToken: cookies.get('accessToken') || '',
      refreshToken: cookies.get('refreshToken') || '',
    });
  }

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
    if (this.state.accessToken) {
      this.props.onSetTokens(this.state.accessToken, this.state.refreshToken);
      this.props.onGetUser();
    }
  }

  render() {
    const {
      loading, error, user,
    } = this.props;


    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <CenteredSection>
          <H2>
            {!this.state.accessToken || !this.state.refreshToken ? (
              <A href="/login">
                <FormattedMessage {...messages.login} />
              </A>
            ) : null}

            {error ? (
              <FormattedMessage {...messages.login.error} />
            ) : null}

            { user && !loading ? (
              <A href={user.uri}>{user.display_name}</A>
            ) : null}
          </H2>
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
  onSetTokens: PropTypes.func,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  user: PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onGetUser: () => dispatch(loadUser()),
    onSetTokens: (accessToken, refreshToken) => dispatch(setTokens(accessToken, refreshToken)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
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
  withCookies,
)(HomePage);
