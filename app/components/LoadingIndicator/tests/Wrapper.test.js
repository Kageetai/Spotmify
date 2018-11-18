import React from 'react';
import renderer from 'react-test-renderer';

import Wrapper from '../Wrapper';

describe('<Wrapper />', () => {
  it('should match the snapshot', () => {
    const wrapper = renderer.create(<Wrapper />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
