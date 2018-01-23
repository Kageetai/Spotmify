import { createSelector } from 'reselect';

const selectRouter = state => state.get('router');

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectAccessToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('accessToken')
);

const makeSelectRefreshToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('refreshToken')
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
  makeSelectUser,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
};
