/**
 * Testing our link component
 */

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import A from '../index';

const href = 'http://mxstbr.com/';
const children = <h1>Test</h1>;
const renderComponent = (props = {}) =>
  shallow(
    <A href={href} {...props}>
      {children}
    </A>,
  );

describe('<A />', () => {
  it('should match the snapshot', () => {
    const wrapper = renderer.create(<A />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should have an href attribute', () => {
    const wrapper = renderComponent();
    expect(wrapper.prop('href')).toEqual(href);
  });

  it('should have children', () => {
    const wrapper = renderComponent();
    expect(wrapper.contains(children)).toEqual(true);
  });

  it('should adopt a target attribute', () => {
    const target = '_blank';
    const wrapper = renderComponent({ target });
    expect(wrapper.prop('target')).toEqual(target);
  });

  it('should adopt a type attribute', () => {
    const type = 'text/html';
    const wrapper = renderComponent({ type });
    expect(wrapper.prop('type')).toEqual(type);
  });
});
