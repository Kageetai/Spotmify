import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from '../index';

describe('<LoadingIndicator />', () => {
  it('should render 12 divs', () => {
    const wrapper = shallow(<LoadingIndicator />);
    expect(wrapper.find('Circle').length).toBe(12);
  });
});
