export const ADD_POKEMON = 'ADD_POKEMON';
export const RELEASE_POKEMON = 'RELEASE_POKEMON';

/**
 * ActionCreators
 */
export function addPokemon(data) {
    return {
        type: ADD_POKEMON,
        data
    }
}

export function removePokemon(index) {
    return {
        type: RELEASE_POKEMON,
        index
    }
}