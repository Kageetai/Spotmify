import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Ul from '../Ul';

describe('<Ul />', () => {
  it('should match the snapshot', () => {
    const wrapper = renderer.create(<Ul />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an <ul> tag', () => {
    const wrapper = mount(<Ul />);
    expect(wrapper.find('ul').type()).toEqual('ul');
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<Ul />);
    expect(wrapper.find('ul').prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = mount(<Ul id={id} />);
    expect(wrapper.find('ul').prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = mount(<Ul attribute="test" />);
    expect(wrapper.find('ul').prop('attribute')).toBeUndefined();
  });
});
