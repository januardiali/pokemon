export const SET_LOADING = 'SET_LOADING';
export const SET_FAIL = 'SET_FAIL';
export const SET_PROGRESS = 'SET_PROGRESS';

export const GET_ALL_POKEMON = 'GET_ALL_POKEMON';
export const RECEIVE_ALL_POKEMON = 'RECEIVE_ALL_POKEMON';

export const GET_POKEMON_DETAIL = 'GET_POKEMON_DETAIL';
export const RECEIVE_POKEMON_DETAIL = 'RECEIVE_POKEMON_DETAIL';

/**
 * ActionCreators
 */

export function showLoading() {
    return {
        type: SET_LOADING,
        payload: true
    }
}

export function hideLoading() {
    return {
        type: SET_LOADING,
        payload: false
    }
}

export function fail(error) {
    return {
      type: SET_FAIL,
      error
    }
}
  
export function fetchAllPokemon(param) {
    return {
        type: GET_ALL_POKEMON,
        param
    }
}

export function receiveAllPokemon(payload) {
    return {
        type: RECEIVE_ALL_POKEMON,
        payload
    }
}

export function fetchPokemonDetail(id) {
    return {
        type: GET_POKEMON_DETAIL,
        id
    }
}

export function receivePokemonDetail(data) {
    return {
        type: RECEIVE_POKEMON_DETAIL,
        data
    }
}



