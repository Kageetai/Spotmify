import React from 'react';
import renderer from 'react-test-renderer';

import Item from '../Item';

describe('<Item />', () => {
  it('should match the snapshot', () => {
    const wrapper = renderer.create(<Item />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
