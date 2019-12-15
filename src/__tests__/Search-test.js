import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Search from '../components/Search';

describe("Search component", () => {
  it("Search component renders", () => {
    const wrapper = shallow(<Search value={'bulbasaur'} />)
    expect(wrapper).toHaveLength(1);
  });

  it("responds to search change", () => {
    const handleChangeSpy = sinon.spy();
    const event = {target: {name: "searchPokemon", value: "bulbasaur"}};
    const wrapper = mount(
      <Search value={'bulbasaur'} onChange={handleChangeSpy} />
    );
    wrapper.find('input').simulate('change', event);
    expect(handleChangeSpy.calledOnce).toEqual(true);
  });
})