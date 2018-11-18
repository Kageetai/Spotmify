import { fromJS } from 'immutable';

import {
  makeSelectAccessToken,
  makeSelectExpires,
  makeSelectUser,
  makeSelectLibrary,
  makeSelectLibraryTotal,
  makeSelectTrack,
  makeSelectTrackLoading,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
} from 'containers/App/selectors';

import { TrackRecord, UserRecord } from '../reducer';

describe('makeSelectAccessToken', () => {
  it('should select the access token', () => {
    const accessToken = '1234';
    const mockedState = fromJS({
      global: {
        accessToken,
      },
    });
    expect(makeSelectAccessToken()(mockedState)).toEqual(accessToken);
  });
});

describe('makeSelectExpires', () => {
  it('should select the expiry', () => {
    const expires = '1234';
    const mockedState = fromJS({
      global: {
        expires,
      },
    });
    expect(makeSelectExpires()(mockedState)).toEqual(expires);
  });
});

describe('makeSelectUser', () => {
  it('should select the user', () => {
    const user = new UserRecord({});
    const mockedState = fromJS({
      global: {
        user,
      },
    });
    expect(makeSelectUser()(mockedState)).toEqual(user);
  });
});

describe('makeSelectLibrary', () => {
  it('should select the library', () => {
    const library = [];
    const mockedState = fromJS({
      global: {
        library,
      },
    });
    expect(makeSelectLibrary()(mockedState)).toEqual(library);
  });
});

describe('makeSelectLibraryTotal', () => {
  it('should select the library total', () => {
    const libraryTotal = 10;
    const mockedState = fromJS({
      global: {
        libraryTotal,
      },
    });
    expect(makeSelectLibraryTotal()(mockedState)).toEqual(libraryTotal);
  });
});

describe('makeSelectTrack', () => {
  it('should select the current track', () => {
    const track = new TrackRecord({});
    const mockedState = fromJS({
      global: {
        track,
      },
    });
    expect(makeSelectTrack()(mockedState)).toEqual(track);
  });
});

describe('makeSelectTrackLoading', () => {
  it('should select the current track loading', () => {
    const trackLoading = true;
    const mockedState = fromJS({
      global: {
        trackLoading,
      },
    });
    expect(makeSelectTrackLoading()(mockedState)).toEqual(trackLoading);
  });
});

describe('makeSelectLoading', () => {
  it('should select loading', () => {
    const loading = true;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });
    expect(makeSelectLoading()(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  it('should select the error', () => {
    const error = 'error';
    const mockedState = fromJS({
      global: {
        error,
      },
    });
    expect(makeSelectError()(mockedState)).toEqual(error);
  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const mockedState = fromJS({
      router: { location: { pathname: '/foo' } },
    });
    expect(locationStateSelector(mockedState)).toEqual(
      mockedState.getIn(['router', 'location']).toJS(),
    );
  });
});
