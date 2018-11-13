import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const makeSelectAccessToken = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('accessToken'),
  );

const makeSelectExpires = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('expires'),
  );

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('user'),
  );

const makeSelectLibrary = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('library'),
  );

const makeSelectLibraryTotal = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('libraryTotal'),
  );

const makeSelectTrack = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('track'),
  );

const makeSelectTrackLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('trackLoading'),
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('loading'),
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('error'),
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.get('location').toJS(),
  );

export {
  selectGlobal,
  makeSelectAccessToken,
  makeSelectExpires,
  makeSelectUser,
  makeSelectLibrary,
  makeSelectLibraryTotal,
  makeSelectTrack,
  makeSelectTrackLoading,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
};
