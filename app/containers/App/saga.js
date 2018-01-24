/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import Spotify from 'spotify-web-api-js';

import request from 'utils/request';
import { isLoggedIn } from 'utils/auth';

import { GET_TOKENS, LOAD_LIBRARY, LOAD_USER } from './constants';
import { makeSelectAccessToken, makeSelectRefreshToken } from './selectors';
import {
  loadLibraryError,
  loadLibrarySuccess,
  loadUserError,
  loadUserSuccess,
  refreshTokensError,
  setTokens,
} from './actions';

const spotifyApi = new Spotify();

export function* checkTokens() {
  let accessToken = yield select(makeSelectAccessToken());
  const refreshToken = yield select(makeSelectRefreshToken());

  if (isLoggedIn) {
    try {
      const newTokens = yield call(request, '/refresh_token', {
        credentials: 'same-origin',
      });
      // eslint-disable-next-line prefer-destructuring
      accessToken = newTokens.accessToken;
      yield put(setTokens(accessToken, refreshToken, newTokens.expires));
    } catch (err) {
      yield put(refreshTokensError(err));
    }
  }

  yield call(spotifyApi.setAccessToken, accessToken);
}

export function* getUser() {
  yield call(checkTokens);
  try {
    const user = yield call(spotifyApi.getMe);
    yield put(loadUserSuccess(user));
  } catch (err) {
    yield put(loadUserError(err));
  }
}

export function* getLibrary() {
  yield call(checkTokens);
  try {
    const library = yield call(spotifyApi.getMySavedTracks);
    yield put(loadLibrarySuccess(library));
  } catch (err) {
    yield put(loadLibraryError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* spotifyData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_TOKENS, checkTokens);
  yield takeLatest(LOAD_USER, getUser);
  yield takeLatest(LOAD_LIBRARY, getLibrary);
}
