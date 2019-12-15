import { combineReducers } from 'redux'
import pokemonReducer from './pokemon'
import myPokemonReducer from './myPokemon'

export default combineReducers({
  pokemon: pokemonReducer,
  myPokemon: myPokemonReducer
});