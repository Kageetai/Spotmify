import React from 'react';
import renderer from 'react-test-renderer';

import Select from '../Select';

describe('<Select />', () => {
  it('should match the snapshot', () => {
    const wrapper = renderer.create(<Select />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
