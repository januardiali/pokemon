import React from 'react';
import { shallow } from 'enzyme';
import StatusBar from '../components/StatusBar';

describe("Status bar component", () => {
  it("StatusBar component renders", () => {
    const wrapper = shallow(<StatusBar value={255} max={255} color="red"/>)
    expect(wrapper).toHaveLength(1);
  });
})