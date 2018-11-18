import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import A from '../A';

describe('<A />', () => {
  it('should match the snapshot', () => {
    const wrapper = renderer.create(<A />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<A />);
    expect(wrapper.find('a').prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = mount(<A id={id} />);
    expect(wrapper.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = mount(<A attribute="test" />);
    expect(wrapper.find('a').prop('attribute')).toBeUndefined();
  });
});
