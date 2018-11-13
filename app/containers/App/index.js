/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import { isLoggedIn } from 'utils/auth';
import HomePage from 'containers/HomePage/Loadable';
import Callback from 'containers/Callback/Loadable';
import LibraryPage from 'containers/LibraryPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import GlobalStyle from 'global-styles';

import saga from './saga';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const AppWrapper = styled.div`
  max-width: calc(1200px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - Spotmify" defaultTitle="Spotmify">
        <meta
          name="description"
          content="View and export your spotify library and playlists"
        />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/callback" component={Callback} />
        <PrivateRoute path="/library" component={LibraryPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  );
}

const withSaga = injectSaga({ key: 'app', saga });

export default compose(withSaga)(App);
