/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOGIN_ERROR,
  SET_TOKENS,
  DELETE_TOKENS,
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  LOAD_LIBRARY,
  LOAD_LIBRARY_SUCCESS,
  LOAD_LIBRARY_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  accessToken: '',
  expires: '',
  loading: false,
  error: false,
  user: {},
  library: [],
  libraryTotal: 0,
  libraryPages: 0,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKENS:
      return state
        .set('accessToken', action.accessToken)
        .set('expires', action.expires)
        .set('error', false);
    case DELETE_TOKENS:
      return state
        .set('accessToken', initialState.accessToken)
        .set('expires', initialState.expires)
        .set('user', initialState.user)
        .set('library', initialState.library)
        .set('error', false);
    case LOAD_USER:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['user'], initialState.user);
    case LOAD_USER_SUCCESS:
      return state
        .setIn(['user'], action.user)
        .set('loading', false);
    case LOAD_LIBRARY:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_LIBRARY_SUCCESS:
      return state
        .setIn('library', action.library.items)
        .set('libraryTotal', action.library.total)
        .set('libraryPages', Math.ceil(action.library.total / action.library.limit))
        .set('loading', false);
    case LOGIN_ERROR:
    case LOAD_USER_ERROR:
    case LOAD_LIBRARY_ERROR:
      console.error('error');
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
