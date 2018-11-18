import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';

import messages from '../messages';
import { LibraryPage } from '../index';

describe('<LibraryPage />', () => {
  const props = {
    intl: {
      formatMessage: jest.fn(),
    },
    onExportCsv: jest.fn(),
  };

  it('should render its heading', () => {
    const wrapper = shallow(<LibraryPage {...props} />);
    expect(
      wrapper.contains(
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>,
      ),
    ).toBe(true);
  });

  it('should render the export button and call action', () => {
    const wrapper = shallow(<LibraryPage {...props} />);
    expect(wrapper.find('Button').prop('disabled')).toBe(true);
    wrapper.find('Button').simulate('click');
    expect(props.onExportCsv).toHaveBeenCalled();
  });

  // it('should never re-render the component', () => {
  //   const wrapper = shallow(<LibraryPage />);
  //   const inst = wrapper.instance();
  //   expect(inst.shouldComponentUpdate()).toBe(false);
  // });
});
