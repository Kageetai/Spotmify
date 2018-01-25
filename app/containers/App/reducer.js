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
import Cookies from 'js-cookie';
import moment from 'moment';

import {
  SET_TOKENS,
  DELETE_TOKENS,
  REFRESH_TOKENS_ERROR,
  LOAD_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  LOAD_LIBRARY,
  LOAD_LIBRARY_SUCCESS,
  LOAD_LIBRARY_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  accessToken: Cookies.get('accessToken') || '',
  refreshToken: Cookies.get('refreshToken') || '',
  expires: Cookies.get('expires') || moment(),
  loading: false,
  error: false,
  user: {},
  library: [],
  libraryTotal: 0,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKENS:
      Cookies.set('accessToken', action.accessToken);
      Cookies.set('refreshToken', action.refreshToken);
      Cookies.set('expires', action.expires);
      return state
        .set('accessToken', action.accessToken)
        .set('refreshToken', action.refreshToken)
        .set('expires', action.expires)
        .set('error', false);
    case DELETE_TOKENS:
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('expires');
      return state
        .set('accessToken', initialState.accessToken)
        .set('refreshToken', initialState.refreshToken)
        .set('expires', initialState.expires)
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
        .update('library', library => library.concat(action.library.items))
        .set('libraryTotal', action.library.total)
        .set('loading', false);
    case REFRESH_TOKENS_ERROR:
    case LOAD_USER_ERROR:
    case LOAD_LIBRARY_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
