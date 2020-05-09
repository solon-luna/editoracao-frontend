import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './dashboard';
import { Home } from './home';

describe('<home />', () => {
  test('renders', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
