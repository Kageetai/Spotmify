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

import injectSaga from 'utils/injectSaga';
import { isLoggedIn } from 'utils/auth';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectAccessToken,
  makeSelectUser,
} from 'containers/App/selectors';
import { loadUser } from 'containers/App/actions';
import saga from 'containers/App/saga';
import Button from 'components/Button';
import UserProfile from 'components/UserProfile';
import Section from 'components/Section';

import messages from './messages';
import CenteredSection from './CenteredSection';

export class HomePage extends React.PureComponent {
  componentWillMount() {
    if (isLoggedIn()) {
      this.props.onGetUser();
    }
  }

  render() {
    const { loading, error, user } = this.props;
    const loggedIn = isLoggedIn();

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Spotmify homepage" />
        </Helmet>
        <Section>
          {!loggedIn && (
            <CenteredSection>
              <Button href="/login">
                <FormattedMessage {...messages.login} />
              </Button>
            </CenteredSection>
          )}

          {error ? (
            <FormattedMessage {...messages.login.error} />
          ) : null}

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
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onGetUser: PropTypes.func,
  accessToken: PropTypes.string,
  user: PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
    onGetUser: () => dispatch(loadUser()),
  };
}

const mapStateToProps = createStructuredSelector({
  accessToken: makeSelectAccessToken(),
  user: makeSelectUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withSaga,
  withConnect,
)(HomePage);
