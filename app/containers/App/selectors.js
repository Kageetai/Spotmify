import { createSelector } from 'reselect';

const selectRouter = state => state.get('router');

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectAccessToken = () => createSelector(
  selectGlobal,
  globalState => globalState.get('accessToken')
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
  globalState => globalState.getIn('library')
);

const makeSelectLibraryTotal = () => createSelector(
  selectGlobal,
  globalState => globalState.getIn(['libraryTotal'])
);

const makeSelectLibraryPages = () => createSelector(
  selectGlobal,
  globalState => globalState.getIn(['libraryPages'])
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
  makeSelectExpires,
  makeSelectUser,
  makeSelectLibrary,
  makeSelectLibraryTotal,
  makeSelectLibraryPages,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
};
