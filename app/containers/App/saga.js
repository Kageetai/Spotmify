/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import Spotify from 'spotify-web-api-js';

import { SET_TOKENS, LOAD_USER } from './constants';
import { makeSelectTokens } from './selectors';
import { loadUserError, loadUserSuccess } from './actions';

const spotifyApi = new Spotify();

export function* setTokens() {
  const tokens = yield select(makeSelectTokens());
  yield spotifyApi.setAccessToken(tokens.accessToken);
}

/**
 * Github repos request/response handler
 */
export function* getUser() {
  try {
    const user = yield call(spotifyApi.getMe);
    yield put(loadUserSuccess(user));
  } catch (err) {
    yield put(loadUserError(err));
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
  yield takeLatest(SET_TOKENS, setTokens);
  yield takeLatest(LOAD_USER, getUser);
}
