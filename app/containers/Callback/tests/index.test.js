import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';

import { Callback } from '../index';

describe('<Callback />', () => {
  const props = {
    onGetTokens: jest.fn(),
  };

  it('renders a datetime', () => {
    const wrapper = shallow(<Callback {...props} />);
    expect(wrapper.contains(<Redirect to="/" />)).toBeTruthy();
    expect(props.onGetTokens).toHaveBeenCalled();
  });
});
