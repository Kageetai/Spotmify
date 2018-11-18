import React from 'react';
import { shallow } from 'enzyme/build';

import Table from '../index';

describe('<Table />', () => {
  it('renders ReactTable', () => {
    const wrapper = shallow(<Table />);
    expect(wrapper.find('ReactTable').exists()).toBeTruthy();
  });

  it('has seven columns', () => {
    const wrapper = shallow(<Table />);
    expect(wrapper.instance().columns).toHaveLength(7);
  });
});
