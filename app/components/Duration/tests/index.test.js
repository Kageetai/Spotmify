import React from 'react';
import { shallow } from 'enzyme';

import Duration from '../index';

describe('<Duration />', () => {
  it('renders a duration', () => {
    const wrapper = shallow(<Duration milliseconds={100000} />);
    expect(wrapper.contains(<div>1:40</div>)).toBeTruthy();
  });
});
