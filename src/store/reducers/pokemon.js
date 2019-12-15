import {
    RECEIVE_ALL_POKEMON,
    RECEIVE_POKEMON_DETAIL,
    SET_LOADING,
    SET_FAIL,
} from '../actions/pokemon';

const initialState = {
    collection: {},
    count: 0,
    progress: 0,
    detail: {},
    isFetched: false
}

const pokemonReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOADING:
            return {
                ...state,
                isFetched: action.payload
            }
        case RECEIVE_ALL_POKEMON: 
            return {
                ...state,
                count: action.payload.count,
                collection: {
                    ...state.collection,
                    ...action.payload.results.reduce((accumulator, item) => {
                        const { url } = item
                        const id = url.substring(34, url.length - 1)
            
                        return {
                            ...accumulator,
                            [id]: {
                                id: parseInt(id),
                                ...item
                            }
                        }
                    }, {})
                }
            }
        case RECEIVE_POKEMON_DETAIL:
            return {
                ...state,
                detail: action.data
            }
        case SET_FAIL:
            return {
                ...state,
                isFetched: false
            }
        default:
            return state;
    }
}

export default pokemonReducer;