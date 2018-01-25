/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRoute = state => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  globalState => globalState.get('currentUser')
);

const makeSelectAccessToken = () => createSelector(
  selectGlobal,
  globalState => globalState.get('accessToken')
);

const makeSelectRefreshToken = () => createSelector(
  selectGlobal,
  globalState => globalState.get('refreshToken')
);

const makeSelectExpires = () => createSelector(
  selectGlobal,
  globalState => globalState.get('expires')
);

const makeSelectUser = () => createSelector(
  selectGlobal,
  globalState => globalState.getIn(['user'])
);

const makeSelectLibrary = () => createSelector(
  selectGlobal,
  globalState => globalState.get('library').toJS()
);

const makeSelectLibraryTotal = () => createSelector(
  selectGlobal,
  globalState => globalState.getIn(['libraryTotal'])
);

const makeSelectLibraryHasNextPage = () => createSelector(
  selectGlobal,
  globalState => globalState.getIn(['libraryHasNextPage'])
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  globalState => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  globalState => globalState.get('error')
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  routeState => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectAccessToken,
  makeSelectRefreshToken,
  makeSelectExpires,
  makeSelectUser,
  makeSelectLibrary,
  makeSelectLibraryTotal,
  makeSelectLibraryHasNextPage,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
};
