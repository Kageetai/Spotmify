/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import Spotify from 'spotify-web-api-js';

import { GET_TOKENS, LOAD_USER } from './constants';
import { makeSelectAccessToken } from './selectors';
import { loadUserError, loadUserSuccess, setTokens } from './actions';

const cookies = new Cookies();
const spotifyApi = new Spotify();

export function* checkTokens() {
  let accessToken = yield select(makeSelectAccessToken());
  if (!accessToken) {
    const tokens = cookies.getAll();
    // eslint-disable-next-line prefer-destructuring
    accessToken = tokens.accessToken;
    yield put(setTokens(tokens.accessToken, tokens.refreshToken));
  }
  yield call(spotifyApi.setAccessToken, accessToken);
}
checkTokens();

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
  yield takeEvery(LOAD_USER, checkTokens);
  yield takeLatest(GET_TOKENS, checkTokens);
  yield takeLatest(LOAD_USER, getUser);
}
