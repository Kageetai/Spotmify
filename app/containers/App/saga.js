import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import moment from 'moment';
import Spotify from 'spotify-web-api-js';
import Json2csv from 'json2csv';
import FileSaver from 'file-saver';

import { isExpired } from 'utils/auth';

import pkg from '../../../package.json';

import {
  LOGIN,
  GET_TOKENS,
  LOAD_LIBRARY,
  LOAD_USER,
  DELETE_TOKENS,
  EXPORT_CSV,
} from './constants';
import {
  loadLibraryError,
  loadLibrarySuccess,
  loadUserError,
  loadUserSuccess,
  loginError,
  setTokens,
} from './actions';

const spotifyApi = new Spotify();

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
  const hashParams = {};
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  let e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
}

export function* login() {
  const state = generateRandomString(16);
  localStorage.setItem(pkg.spotify.stateKey, state);

  window.location =
    `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(pkg.spotify.clientId)
    }&scope=${encodeURIComponent(pkg.spotify.scope)
    }&redirect_uri=${encodeURIComponent(window.location.origin + pkg.spotify.redirectUri)
    }&state=${encodeURIComponent(state)}`;
}

export function* logout() {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('expires');
  yield put(push('/'));
}

export function* checkTokens() {
  const params = getHashParams();
  const accessToken = params.access_token;
  const storedToken = sessionStorage.getItem('accessToken');
  const expires = sessionStorage.getItem('expires');
  const storedState = localStorage.getItem(pkg.spotify.stateKey);
  const { state } = params;
  const expiresIn = params.expires_in;

  if (storedToken && !isExpired(expires)) {
    yield call(spotifyApi.setAccessToken, storedToken);
    yield put(setTokens(storedToken, expires));
  } else if (accessToken && (state == null || state !== storedState)) {
    yield put(loginError('login error'));
  } else {
    localStorage.removeItem(pkg.spotify.stateKey);
    if (accessToken && expiresIn) {
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('expires', moment().add(expiresIn, 's').format());
      yield put(setTokens(accessToken, moment().add(expiresIn, 's').format()));
      yield call(spotifyApi.setAccessToken, accessToken);
    }
  }
}

export function* loadUser() {
  try {
    const user = yield call(spotifyApi.getMe);
    yield put(loadUserSuccess(user));
  } catch (err) {
    yield put(loadUserError(err));
  }
}

export function* loadLibrary(action) {
  const { page, pageSize } = action;

  try {
    const newLibrary = yield call(spotifyApi.getMySavedTracks, {
      offset: page * pageSize,
      limit: pageSize,
    });
    yield put(loadLibrarySuccess(newLibrary));
  } catch (err) {
    yield put(loadLibraryError(err));
  }
}

export function* loadFullLibrary() {
  let library = [];
  let newLibrary = [];

  try {
    do {
      newLibrary = yield call(spotifyApi.getMySavedTracks, {
        offset: library.length,
        limit: 50, // 50 is the maximum page size allowed by Spotify API
      });
      library = library.concat(newLibrary.items);
    } while (newLibrary.next);
    yield put(loadLibrarySuccess(library));
  } catch (err) {
    yield put(loadLibraryError(err));
  }
}

export function* exportCSV(action) {
  const fields = [
    {
      label: 'name',
      value: 'track.name',
    },
    {
      label: 'artist',
      value: 'track.artists[0].name',
    },
    {
      label: 'album',
      value: 'track.album.name',
    },
    {
      label: 'duration',
      value: 'track.duration_ms',
    },
    {
      label: 'popularity',
      value: 'track.popularity',
    },
    'added_at',
  ];
  const csv = Json2csv({ data: action.items, fields, del: pkg.csvDelimiter });
  const blob = new Blob([csv], { type: 'text/csv' });
  FileSaver.saveAs(blob, 'export.csv');
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* spotifyData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield checkTokens();

  yield takeLatest(LOGIN, login);
  yield takeLatest(DELETE_TOKENS, logout);
  yield takeLatest(GET_TOKENS, checkTokens);
  yield takeLatest(LOAD_USER, loadUser);
  yield takeLatest(LOAD_LIBRARY, loadFullLibrary);
  yield takeLatest(EXPORT_CSV, exportCSV);
}
