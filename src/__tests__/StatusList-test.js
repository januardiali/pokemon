import React from 'react';
import { shallow } from 'enzyme';
import StatusList from '../components/StatusList';

describe("Status list component", () => {
  it("Status list component renders", () => {
    const types = [
        {slot: 2, type: {name: "poison", url: "https://pokeapi.co/api/v2/type/4/"}},
        {slot: 1, type: {name: "grass", url: "https://pokeapi.co/api/v2/type/12/"}}
    ];
    const stats = [
        {base_stat: 45, effort: 0, stat: {name: "speed", url: "https://pokeapi.co/api/v2/stat/6/"}},
        {base_stat: 65, effort: 0, stat: {name: "special-defense", url: "https://pokeapi.co/api/v2/stat/5/"}},
        {base_stat: 65, effort: 1, stat: {name: "special-attack", url: "https://pokeapi.co/api/v2/stat/4/"}},
        {base_stat: 49, effort: 0, stat: {name: "defense", url: "https://pokeapi.co/api/v2/stat/3/"}},
        {base_stat: 49, effort: 0, stat: {name: "attack", url: "https://pokeapi.co/api/v2/stat/2/"}},
        {base_stat: 45, effort: 0, stat: {name: "hp", url: "https://pokeapi.co/api/v2/stat/1/"}}
    ];
    const wrapper = shallow(<StatusList types={types} stats={stats} />)
    expect(wrapper).toHaveLength(6);
  });
})