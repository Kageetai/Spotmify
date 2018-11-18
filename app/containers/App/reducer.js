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

import { fromJS, Record } from 'immutable';

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
  LOAD_TRACK,
  LOAD_TRACK_SUCCESS,
  LOAD_TRACK_ERROR,
  EXPORT_CSV_ERROR,
} from './constants';

export const UserRecord = Record({
  display_name: '',
  href: '',
  uri: '',
  followers: {
    href: '',
    total: 0,
  },
  country: '',
  external_urls: {
    spotify: '',
  },
  images: [],
  type: '',
  id: '',
  email: '',
  product: '',
});

export const TrackRecord = Record({
  album: {
    images: [],
    name: '',
    uri: '',
  },
  name: '',
  id: '',
  uri: '',
  images: [],
  artists: [],
  acousticness: 0,
  danceability: 0,
  energy: 0,
  instrumentalness: 0,
  liveness: 0,
  speechiness: 0,
  valence: 0,
});

// The initial state of the App
const initialState = fromJS({
  accessToken: '',
  expires: '',
  loading: false,
  error: false,
  user: new UserRecord({}),
  library: [],
  libraryTotal: 0,
  track: new TrackRecord({}),
  trackLoading: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKENS:
      return state
        .set('accessToken', action.accessToken)
        .set('expires', action.expires)
        .set('error', false);
    case DELETE_TOKENS:
      return initialState;
    case LOAD_USER:
    case LOAD_LIBRARY:
      return state.set('loading', true).set('error', false);
    case LOAD_USER_SUCCESS:
      return state
        .set('user', new UserRecord(action.user))
        .set('loading', false);
    case LOAD_LIBRARY_SUCCESS:
      return state
        .set('library', fromJS(action.library))
        .set('libraryTotal', action.library.length)
        .set('loading', false);
    case LOAD_TRACK:
      return state
        .set('track', new TrackRecord(initialState.track))
        .set('trackLoading', true)
        .set('error', false);
    case LOAD_TRACK_SUCCESS:
      return state
        .set('track', new TrackRecord(action.track))
        .set('trackLoading', false);
    case LOGIN_ERROR:
    case LOAD_USER_ERROR:
    case LOAD_LIBRARY_ERROR:
    case LOAD_TRACK_ERROR:
    case EXPORT_CSV_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
        .set('trackLoading', false);
    default:
      return state;
  }
}

export default appReducer;
