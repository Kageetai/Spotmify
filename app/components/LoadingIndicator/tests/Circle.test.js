import React from 'react';
import { mount } from 'enzyme';

import Circle from '../Circle';

describe('<Circle />', () => {
  it('should render an <div> tag', () => {
    const wrapper = mount(<Circle />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should have a className attribute', () => {
    const wrapper = mount(<Circle />);
    expect(wrapper.find('div').prop('className')).toBeDefined();
  });

  it('should not adopt attributes', () => {
    const id = 'test';
    const wrapper = mount(<Circle id={id} />);
    expect(wrapper.find('div').prop('id')).toBeUndefined();
  });
});
