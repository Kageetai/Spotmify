/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import HomePage from 'containers/HomePage/Loadable';
import Callback from 'containers/Callback/Loadable';
import LibraryPage from 'containers/LibraryPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import saga from './saga';

const AppWrapper = styled.div`
  max-width: calc(960px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Spotmify"
        defaultTitle="Spotmify"
      >
        <meta name="description" content="View and export your spotify library and playlists" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/callback" component={Callback} />
        <Route path="/library" component={LibraryPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
    </AppWrapper>
  );
}

const withSaga = injectSaga({ key: 'app', saga });

export default compose(withSaga)(App);
