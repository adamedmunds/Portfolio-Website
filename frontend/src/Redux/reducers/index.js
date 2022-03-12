import { combineReducers } from 'redux';

import userReducer from './userReducer';
import pokedexReducer from './pokedexReducer';
import colorReducer from './colorReducer';

const reducers = combineReducers({
  user: userReducer,
  pokedex: pokedexReducer,
  color: colorReducer,
});

export default reducers;
