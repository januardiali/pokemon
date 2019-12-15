import {
    ADD_POKEMON,
    RELEASE_POKEMON
} from '../actions/myPokemon';

const initialState = {
    pokemonList: []
}

const myPokemonReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POKEMON:
            return {
                ...state,
                pokemonList: [...state.pokemonList, action.data]
            }
        case RELEASE_POKEMON:
            return {
                ...state,
                pokemonList: [...state.pokemonList.slice(0, action.index),
                    ...state.pokemonList.slice(action.index + 1)
                ]
            }
        default:
            return state;
    }
}

export default myPokemonReducer;