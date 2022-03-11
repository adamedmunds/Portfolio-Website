import { combineReducers } from 'redux';

import userReducer from './userReducer';
import pokedexReducer from './pokedexReducer';

const reducers = combineReducers({
  user: userReducer,
  pokedex: pokedexReducer,
});

export default reducers;
