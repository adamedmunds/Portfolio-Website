import { combineReducers } from 'redux';

import userReducer from './userReducer';
import pokedexReducer from './pokedexReducer';
import colorReducer from './colorReducer';
import pokemonListReducer from './pokemonListReducer';

const reducers = combineReducers({
  user: userReducer,
  pokedex: pokedexReducer,
  color: colorReducer,
  pokemonList: pokemonListReducer,
});

export default reducers;
