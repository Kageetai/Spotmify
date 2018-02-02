/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOGIN,
  LOGIN_ERROR,
  GET_TOKENS,
  SET_TOKENS,
  DELETE_TOKENS,
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  LOAD_LIBRARY,
  LOAD_LIBRARY_SUCCESS,
  LOAD_LIBRARY_ERROR,
} from './constants';

/**
 * Redirect the user to Spotify Login
 *
 * @return {object} An action object with a type of SET_TOKENS
 */
export function login() {
  return {
    type: LOGIN,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

/**
 * Get Spotify access token
 *
 * @return {object} An action object with a type of SET_TOKENS
 */
export function getTokens() {
  return {
    type: GET_TOKENS,
  };
}

/**
 * Set Spotify access token
 *
 * @return {object} An action object with a type of SET_TOKENS
 */
export function setTokens(accessToken, expires) {
  return {
    type: SET_TOKENS,
    accessToken,
    expires,
  };
}

/**
 * Delete Spotify access token
 *
 * @return {object} An action object with a type of SET_TOKENS
 */
export function deleteTokens() {
  return {
    type: DELETE_TOKENS,
  };
}

/**
 * Load user data from Spotify
 *
 * @return {object} An action object with a type of SET_TOKENS
 */
export function loadUser() {
  return {
    type: LOAD_USER,
  };
}

/**
 * Dispatched when the user is loaded by the request saga
 *
 * @param  {object} user The user data
 *
 * @return {object}      An action object with a type of LOAD_USER_SUCCESS passing the user
 */
export function loadUserSuccess(user) {
  return {
    type: LOAD_USER_SUCCESS,
    user,
  };
}

/**
 * Dispatched when loading the user fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_USER_ERROR passing the error
 */
export function loadUserError(error) {
  return {
    type: LOAD_USER_ERROR,
    error,
  };
}

/**
 * Load users library from Spotify
 *
 * @return {object} An action object with a type of SET_TOKENS
 */
export function loadLibrary() {
  return {
    type: LOAD_LIBRARY,
  };
}

/**
 * Dispatched when the library is loaded by the request saga
 *
 * @param  {object} library The library data
 *
 * @return {object}      An action object with a type of LOAD_LIBRARY_SUCCESS passing the library
 */
export function loadLibrarySuccess(library) {
  return {
    type: LOAD_LIBRARY_SUCCESS,
    library,
  };
}

/**
 * Dispatched when loading the library fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_LIBRARY_ERROR passing the error
 */
export function loadLibraryError(error) {
  return {
    type: LOAD_LIBRARY_ERROR,
    error,
  };
}
