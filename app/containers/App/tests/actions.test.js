import {
  GET_TOKENS,
  LOGIN,
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
  EXPORT_CSV,
  EXPORT_CSV_SUCCESS,
  EXPORT_CSV_ERROR,
} from '../constants';

import {
  getTokens,
  login,
  loginError,
  setTokens,
  deleteTokens,
  loadUser,
  loadUserSuccess,
  loadUserError,
  loadLibrary,
  loadLibrarySuccess,
  loadLibraryError,
  loadTrack,
  loadTrackSuccess,
  loadTrackError,
  exportCSV,
  exportCSVSuccess,
  exportCSVError,
} from '../actions';

describe('App Actions', () => {
  describe('login', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOGIN,
      };

      expect(login()).toEqual(expectedResult);
    });
  });

  describe('loginError', () => {
    it('should return the correct type and the passed repos', () => {
      const error = 'error';
      const expectedResult = {
        type: LOGIN_ERROR,
        error,
      };

      expect(loginError(error)).toEqual(expectedResult);
    });
  });

  describe('getTokens', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: GET_TOKENS,
      };

      expect(getTokens()).toEqual(expectedResult);
    });
  });

  describe('setTokens', () => {
    it('should return the correct type and the passed props', () => {
      const accessToken = '1234';
      const expires = '1234';
      const expectedResult = {
        type: SET_TOKENS,
        accessToken,
        expires,
      };

      expect(setTokens(accessToken, expires)).toEqual(expectedResult);
    });
  });

  describe('deleteTokens', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: DELETE_TOKENS,
      };

      expect(deleteTokens()).toEqual(expectedResult);
    });
  });

  describe('loadUser', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_USER,
      };

      expect(loadUser()).toEqual(expectedResult);
    });
  });

  describe('loadUserSuccess', () => {
    it('should return the correct type and the passed props', () => {
      const user = {};
      const expectedResult = {
        type: LOAD_USER_SUCCESS,
        user,
      };

      expect(loadUserSuccess(user)).toEqual(expectedResult);
    });
  });

  describe('loadUserError', () => {
    it('should return the correct type and the passed props', () => {
      const error = 'error';
      const expectedResult = {
        type: LOAD_USER_ERROR,
        error,
      };

      expect(loadUserError(error)).toEqual(expectedResult);
    });
  });

  describe('loadLibrary', () => {
    it('should return the correct type and the passed props', () => {
      const page = 1;
      const pageSize = 10;
      const expectedResult = {
        type: LOAD_LIBRARY,
        page,
        pageSize,
      };

      expect(loadLibrary(page, pageSize)).toEqual(expectedResult);
    });
  });

  describe('loadLibrarySuccess', () => {
    it('should return the correct type and the passed props', () => {
      const library = {};
      const expectedResult = {
        type: LOAD_LIBRARY_SUCCESS,
        library,
      };

      expect(loadLibrarySuccess(library)).toEqual(expectedResult);
    });
  });

  describe('loadLibraryError', () => {
    it('should return the correct type and the passed props', () => {
      const error = 'error';
      const expectedResult = {
        type: LOAD_LIBRARY_ERROR,
        error,
      };

      expect(loadLibraryError(error)).toEqual(expectedResult);
    });
  });

  describe('loadTrack', () => {
    it('should return the correct type and the passed props', () => {
      const id = '1234';
      const expectedResult = {
        type: LOAD_TRACK,
        id,
      };

      expect(loadTrack(id)).toEqual(expectedResult);
    });
  });

  describe('loadTrackSuccess', () => {
    it('should return the correct type and the passed props', () => {
      const track = {};
      const expectedResult = {
        type: LOAD_TRACK_SUCCESS,
        track,
      };

      expect(loadTrackSuccess(track)).toEqual(expectedResult);
    });
  });

  describe('loadTrackError', () => {
    it('should return the correct type and the passed props', () => {
      const error = 'error';
      const expectedResult = {
        type: LOAD_TRACK_ERROR,
        error,
      };

      expect(loadTrackError(error)).toEqual(expectedResult);
    });
  });


  describe('exportCSV', () => {
    it('should return the correct type and the passed props', () => {
      const items = [];
      const expectedResult = {
        type: EXPORT_CSV,
        items,
      };

      expect(exportCSV(items)).toEqual(expectedResult);
    });
  });

  describe('exportCSVSuccess', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: EXPORT_CSV_SUCCESS,
      };

      expect(exportCSVSuccess()).toEqual(expectedResult);
    });
  });

  describe('exportCSVError', () => {
    it('should return the correct type and the passed props', () => {
      const error = 'error';
      const expectedResult = {
        type: EXPORT_CSV_ERROR,
        error,
      };

      expect(exportCSVError(error)).toEqual(expectedResult);
    });
  });
});
