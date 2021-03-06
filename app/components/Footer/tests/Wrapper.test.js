import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Wrapper from '../Wrapper';

describe('<Wrapper />', () => {
  it('should match the snapshot', () => {
    const wrapper = renderer.create(<Wrapper />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render an <footer> tag', () => {
    const wrapper = mount(<Wrapper />);
    // expect(wrapper.type()).toEqual('footer');
    expect(wrapper.find('footer').length).toEqual(1);
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<Wrapper />);
    expect(wrapper.find('footer').prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const wrapper = mount(<Wrapper id={id} />);
    expect(wrapper.find('footer').prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const wrapper = mount(<Wrapper attribute="test" />);
    expect(wrapper.find('footer').prop('attribute')).toBeUndefined();
  });
});
