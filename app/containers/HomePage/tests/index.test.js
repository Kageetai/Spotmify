import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';

import UserProfile from 'components/UserProfile';
import { UserRecord } from 'containers/App/reducer';
import { isLoggedIn } from 'utils/auth';

import { HomePage } from '../index';
import messages from '../messages';

jest.mock('utils/auth');

describe('<HomePage />', () => {
  it('should render the page title and login button', () => {
    const wrapper = shallow(<HomePage />);
    expect(
      wrapper.contains(<FormattedMessage {...messages.login} />),
    ).toBeTruthy();
  });

  it('should render error message', () => {
    const wrapper = shallow(<HomePage error />);
    expect(
      wrapper.contains(<FormattedMessage {...messages.login.error} />),
    ).toEqual(true);
  });

  it('should render UserProfile', () => {
    const props = {
      accessToken: '1234',
      user: new UserRecord({}),
      onGetUser: jest.fn(),
      loading: false,
      error: false,
    };

    isLoggedIn.mockResolvedValue(true);

    const wrapper = shallow(<HomePage {...props} />);
    expect(
      wrapper.contains(
        <UserProfile
          user={props.user}
          loading={props.loading}
          error={props.error}
        />,
      ),
    ).toEqual(true);
    expect(props.onGetUser).toHaveBeenCalled();
  });
});
