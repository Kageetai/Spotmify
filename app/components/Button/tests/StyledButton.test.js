import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import StyledButton from '../StyledButton';

describe('<StyledButton />', () => {
  it('should match the snapshot', () => {
    const wrapper = renderer.create(<StyledButton />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should adopt an attribute', () => {
    const id = 'test';
    const wrapper = shallow(<StyledButton id={id} />);
    expect(wrapper.prop('id')).toEqual(id);
  });
});
