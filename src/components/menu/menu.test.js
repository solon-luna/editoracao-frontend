import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from './menu';

describe('<menu />', () => {
  test('renders', () => {
    const wrapper = shallow(<menu />);
    expect(wrapper).toMatchSnapshot();
  });
});
