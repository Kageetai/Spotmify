/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import Spotify from 'spotify-web-api-js';

import { GET_TOKENS, LOAD_USER } from './constants';
import { makeSelectAccessToken, makeSelectExpires, makeSelectRefreshToken } from './selectors';
import { loadUserError, loadUserSuccess, refreshTokensError, setTokens } from './actions';
import request from '../../utils/request';

const spotifyApi = new Spotify();

export function* checkTokens() {
  let accessToken = yield select(makeSelectAccessToken());
  const refreshToken = yield select(makeSelectRefreshToken());
  let expires = yield select(makeSelectExpires());

  if (expires < Date.now()) {
    try {
      ({ accessToken, expires } = yield call(request, '/refresh_token', {
        credentials: 'same-origin',
      }));
      yield put(setTokens(accessToken, refreshToken, expires));
    } catch (err) {
      yield put(refreshTokensError(err));
    }
  }

  yield call(spotifyApi.setAccessToken, accessToken);
}

/**
 * Github repos request/response handler
 */
export function* getUser() {
  yield call(checkTokens);
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
  yield takeLatest(GET_TOKENS, checkTokens);
  yield takeLatest(LOAD_USER, getUser);
}
