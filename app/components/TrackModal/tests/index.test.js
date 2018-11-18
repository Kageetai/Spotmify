import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';

import { TrackModal } from '../index';
import ModalHeading from '../Heading';
import messages from '../messages';

describe('<TrackModal />', () => {
  const props = {
    id: '1234',
    loading: false,
    error: false,
    onGetTrack: jest.fn(),
    onClose: jest.fn(),
    track: {
      album: {
        images: [],
        name: '',
        uri: '',
      },
      name: 'track',
      id: '1234',
      uri: 'http://www.google.com/',
      images: [],
      artists: [],
      acousticness: 0,
      danceability: 0,
      energy: 0,
      instrumentalness: 0,
      liveness: 0,
      speechiness: 0,
      valence: 0,
    },
  };

  const trackName = (
    <A href={props.track.uri}>
      <ModalHeading>{props.track.name}</ModalHeading>
    </A>
  );

  it('renders track name', () => {
    const wrapper = shallow(<TrackModal {...props} />);
    expect(wrapper.contains(trackName)).toBeTruthy();
  });

  it('renders loading message', () => {
    const wrapper = shallow(<TrackModal {...props} loading />);
    expect(
      wrapper.contains(<FormattedMessage {...messages.loading} />),
    ).toBeTruthy();
    expect(wrapper.contains(trackName)).toBeFalsy();
  });

  it('renders error message', () => {
    const wrapper = shallow(<TrackModal {...props} error />);
    expect(
      wrapper.contains(<FormattedMessage {...messages.error} />),
    ).toBeTruthy();
    expect(wrapper.contains(trackName)).toBeFalsy();
  });

  it('calls onGetTrack', () => {
    const wrapper = shallow(<TrackModal {...props} loading />);
    wrapper.setProps({ id: '', loading: false });
    wrapper.setProps({ id: props.id });
    expect(props.onGetTrack).toHaveBeenCalledWith(props.id);
  });
});
