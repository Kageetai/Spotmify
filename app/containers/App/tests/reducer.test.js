import { fromJS } from 'immutable';

import appReducer, { TrackRecord, UserRecord } from '../reducer';
import {
  loginError,
  setTokens,
  loadUser,
  loadUserSuccess,
  loadUserError,
  loadLibrary,
  loadLibrarySuccess,
  loadLibraryError,
  loadTrack,
  loadTrackSuccess,
  loadTrackError,
  exportCSVError,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
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
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the setTokens action correctly', () => {
    const accessToken = '1234';
    const expires = '1234';
    const expectedResult = state
      .set('accessToken', accessToken)
      .set('expires', expires);

    expect(appReducer(state, setTokens(accessToken, expires))).toEqual(
      expectedResult,
    );
  });

  it('should handle the deleteTokens action correctly', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadUser action correctly', () => {
    const expectedResult = state.set('loading', true).set('error', false);

    expect(appReducer(state, loadUser())).toEqual(expectedResult);
  });

  it('should handle the loadUserSuccess action correctly', () => {
    const user = {};
    const expectedResult = state
      .set('user', new UserRecord(user))
      .set('loading', false);

    expect(appReducer(state, loadUserSuccess(user))).toEqual(expectedResult);
  });

  it('should handle the loadLibrary action correctly', () => {
    const expectedResult = state.set('loading', true).set('error', false);

    expect(appReducer(state, loadLibrary())).toEqual(expectedResult);
  });

  it('should handle the loadLibrarySuccess action correctly', () => {
    const library = [];
    const expectedResult = state
      .set('library', fromJS(library))
      .set('loading', false);

    expect(appReducer(state, loadLibrarySuccess(library))).toEqual(
      expectedResult,
    );
  });

  it('should handle the loadTrack action correctly', () => {
    const { track } = state;
    const expectedResult = state
      .set('track', new TrackRecord(track))
      .set('trackLoading', true)
      .set('error', false);

    expect(appReducer(state, loadTrack(track))).toEqual(expectedResult);
  });

  it('should handle the loadTrackSuccess action correctly', () => {
    const track = {};
    const expectedResult = state
      .set('track', new TrackRecord(track))
      .set('trackLoading', false);

    expect(appReducer(state, loadTrackSuccess(track))).toEqual(expectedResult);
  });

  it('should handle the error actions correctly', () => {
    const error = 'error';
    const expectedResult = state
      .set('error', error)
      .set('loading', false)
      .set('trackLoading', false);

    expect(appReducer(state, loginError(error))).toEqual(expectedResult);
    expect(appReducer(state, loadUserError(error))).toEqual(expectedResult);
    expect(appReducer(state, loadLibraryError(error))).toEqual(expectedResult);
    expect(appReducer(state, loadTrackError(error))).toEqual(expectedResult);
    expect(appReducer(state, exportCSVError(error))).toEqual(expectedResult);
  });
});
