import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from './A';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './messages';
import H1 from '../H1';
import Section from '../Section';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <header>
        <A href="/">
          <H1>Spotmify</H1>
        </A>
        <Section>
          <NavBar>
            <HeaderLink to="/">
              <FormattedMessage {...messages.home} />
            </HeaderLink>
            <HeaderLink to="/features">
              <FormattedMessage {...messages.features} />
            </HeaderLink>
          </NavBar>
        </Section>
      </header>
    );
  }
}

export default Header;
