import React from 'react';
import { shallow } from 'enzyme';

import DateTime from '../index';

describe('<DateTime />', () => {
  it('renders a datetime', () => {
    const wrapper = shallow(<DateTime timestamp="1999-12-31T23:00:00.000Z" />);
    expect(wrapper.contains(<span>Jan 1, 2000 12:00 AM</span>)).toBeTruthy();
  });
});
