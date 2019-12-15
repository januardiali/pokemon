import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Pokemon from '../components/Pokemon';

describe("Pokemon component", () => {
    const pokemon = {
        id: 1,
        name: 'test',
        stats: [
          {base_stat: 45, effort: 0, stat: {name: "speed", url: "https://pokeapi.co/api/v2/stat/6/"}},
          {base_stat: 65, effort: 0, stat: {name: "special-defense", url: "https://pokeapi.co/api/v2/stat/5/"}},
          {base_stat: 65, effort: 1, stat: {name: "special-attack", url: "https://pokeapi.co/api/v2/stat/4/"}},
          {base_stat: 49, effort: 0, stat: {name: "defense", url: "https://pokeapi.co/api/v2/stat/3/"}},
          {base_stat: 49, effort: 0, stat: {name: "attack", url: "https://pokeapi.co/api/v2/stat/2/"}},
          {base_stat: 45, effort: 0, stat: {name: "hp", url: "https://pokeapi.co/api/v2/stat/1/"}}
        ],
        types: [
          {slot: 2, type: {name: "poison", url: "https://pokeapi.co/api/v2/type/4/"}},
          {slot: 1, type: {name: "grass", url: "https://pokeapi.co/api/v2/type/12/"}}
        ]
    }
  it("pokemon component renders", () => {
    const wrapper = shallow(<Pokemon pokemon={pokemon}/>)
    expect(wrapper).toHaveLength(1);
  });
  it('pokemon component simulates click detail', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount(<Pokemon pokemon={pokemon} onClickDetail={() => onButtonClick(1)} />);
    wrapper.find('button.detail').prop('onClick')();
    expect(onButtonClick.withArgs(1).calledOnce).toEqual(true);
  });
  it('pokemon component simulates click release', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount(<Pokemon pokemon={pokemon} onClickRelease={() => onButtonClick(0)} />);
    wrapper.find('button.release').prop('onClick')();
    expect(onButtonClick.withArgs(0).calledOnce).toEqual(true);
  });
})