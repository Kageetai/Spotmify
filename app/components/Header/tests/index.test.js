import React from 'react';
import { shallow } from 'enzyme';

import { isLoggedIn } from 'utils/auth';

import { Header } from '../index';
import H1 from '../../H1';
import A from '../A';

jest.mock('utils/auth');

describe('<Header />', () => {
  it('should render a heading', () => {
    const wrapper = shallow(<Header />);
    expect(
      wrapper.contains(
        <A href="/">
          <H1>Spotmify</H1>
        </A>,
      ),
    ).toBeTruthy();
  });

  it('should render the logout button when logged in', () => {
    const props = {
      accessToken: '1234',
      onLogout: jest.fn(),
    };

    isLoggedIn.mockResolvedValue(true);

    const wrapper = shallow(<Header {...props} />);
    expect(wrapper.find('Button').exists()).toBeTruthy();
    wrapper.find('Button').simulate('click');
    expect(props.onLogout).toHaveBeenCalled();
  });
});
