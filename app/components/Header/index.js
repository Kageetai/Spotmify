import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { isLoggedIn } from 'utils/auth';
import { deleteTokens } from 'containers/App/actions';

import A from './A';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
import H1 from '../H1';
import Section from '../Section';
import Button from '../Button';
import { makeSelectAccessToken } from '../../containers/App/selectors';

/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component {
  render() {
    return (
      <header>
        <A href="/">
          <H1>Spotmify</H1>
        </A>
        {this.props.accessToken && isLoggedIn() && (
          <Section>
            <NavBar>
              <div>
                <HeaderLink to="/">
                  <FormattedMessage {...messages.home} />
                </HeaderLink>
                <HeaderLink to="/library">
                  <FormattedMessage {...messages.library} />
                </HeaderLink>
              </div>
              <Button onClick={this.props.onLogout}>
                <FormattedMessage {...messages.logout} />
              </Button>
            </NavBar>
          </Section>
        )}
      </header>
    );
  }
}

Header.propTypes = {
  accessToken: PropTypes.string,
  onLogout: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  accessToken: makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLogout: evt => {
      evt.preventDefault();
      dispatch(deleteTokens());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Header);
