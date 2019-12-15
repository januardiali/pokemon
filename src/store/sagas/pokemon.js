import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { merge } from 'lodash/object';

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

        const results = [];
        if (res) {
            // for (let result of res.data.results) {
            //     const resTypes = yield axios({
            //         method: "get",
            //         url: result.url
            //     });
            //     if (resTypes) {
            //         const types = resTypes.data.types.reduce((accumulator, type) => {
            //             accumulator.push({
            //                 name: type.type.name
            //             })
            //             return accumulator;
            //         }, []);
            //         results.push(merge(result, { types }))
            //     }
            // }
            
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