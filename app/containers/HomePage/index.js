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
import styled from 'styled-components';

import { isLoggedIn } from 'utils/auth';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAccessToken,
  makeSelectUser,
} from 'containers/App/selectors';
import { login, loadUser } from 'containers/App/actions';
import { UserRecord } from 'containers/App/reducer';
import Button from 'components/Button';
import UserProfile from 'components/UserProfile';
import Section from 'components/Section';

import messages from './messages';

const Centered = styled.div`
  text-align: center;
`;

export class HomePage extends React.PureComponent {
  componentWillMount() {
    if (isLoggedIn() && !this.props.user.display_name) {
      this.props.onGetUser();
    }
  }

  render() {
    const { accessToken, loading, error, user } = this.props;
    const loggedIn = isLoggedIn() && accessToken;

    return (
      <article>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Spotmify homepage" />
        </Helmet>
        <Section>
          {!loggedIn && (
            <Centered>
              <Button onClick={this.props.onLogin}>
                <FormattedMessage {...messages.login} />
              </Button>
            </Centered>
          )}

          {error ? <FormattedMessage {...messages.login.error} /> : null}

          {loggedIn ? (
            <UserProfile user={user} loading={loading} error={error} />
          ) : null}
        </Section>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onLogin: PropTypes.func,
  onGetUser: PropTypes.func,
  accessToken: PropTypes.string,
  user: PropTypes.instanceOf(UserRecord),
};

export function mapDispatchToProps(dispatch) {
  return {
    onGetUser: () => dispatch(loadUser()),
    onLogin: () => dispatch(login()),
  };
}

const mapStateToProps = createStructuredSelector({
  accessToken: makeSelectAccessToken(),
  user: makeSelectUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
