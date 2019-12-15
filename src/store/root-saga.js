// import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { all, takeLatest } from 'redux-saga/effects'
import { GET_ALL_POKEMON, GET_POKEMON_DETAIL, } from './actions/pokemon';
import { fetchAllPokemon, fetchPokemonDetail } from './sagas/pokemon';

function* rootSaga() {
    yield all([
        takeLatest(
            GET_ALL_POKEMON,
            fetchAllPokemon
        ),
        takeLatest(
            GET_POKEMON_DETAIL,
            fetchPokemonDetail
        )
    ])
}

export default rootSaga