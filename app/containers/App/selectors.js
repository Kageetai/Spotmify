/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectAccessToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('accessToken')
);

const makeSelectRefreshToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('refreshToken')
);

const makeSelectExpires = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('expires')
);

const makeSelectUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn('user')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  selectGlobal,
  makeSelectAccessToken,
  makeSelectRefreshToken,
  makeSelectExpires,
  makeSelectUser,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
};
