import axios from 'axios';
import { put } from 'redux-saga/effects';

import { receiveAllPokemon, receivePokemonDetail, fail, hideLoading, showLoading } from '../actions/pokemon';

export function* fetchAllPokemon({ param }) {
    const limit = param && param.limit ? param.limit : 20;
    const offset = param && param.offset ? param.offset : 0;
    
    try {
        yield put(showLoading())
        const res = yield axios({
            method: "get",
            url: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        });
        if (res) {
            
            const payload = {
                count: res.data.count,
                results: res.data.results
            }
            yield put(receiveAllPokemon(payload));
        }
        
    } catch (err) {
        yield put(fail(err))
    } finally {
        yield put(hideLoading())
    }
}

export function* fetchPokemonDetail({ id }) {
    try {
        const res = yield axios({
            method: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${id}`
        });
        if (res) {
            const { data } = res;
            yield put(receivePokemonDetail(data));
        }
    } catch (err) {
        yield put(hideLoading())
    } 
}