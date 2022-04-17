import { combineReducers } from 'redux';

import userReducer from './userReducer';
import pokedexReducer from './pokedexReducer';
import colorReducer from './colorReducer';
import pokemonListReducer from './pokemonListReducer';
import evolutionReducer from './evolutionReducer';
import currentPokemonReducer from './currentPokemonReducer';
import pageReducer from './pageReducer';
import themeReducer from './themeReducer';
import abilityOneReducer from './abilityOneReducer';
import abilityTwoReducer from './abilityTwoReducer';
import abilityThreeReducer from './abilityThreeReducer';
import updateVersionReducer from './updateVersionReducer';

const reducers = combineReducers({
  user: userReducer,
  pokedex: pokedexReducer,
  color: colorReducer,
  pokemonList: pokemonListReducer,
  evolutionData: evolutionReducer,
  currentPokemon: currentPokemonReducer,
  currentPage: pageReducer,
  theme: themeReducer,
  abilityOne: abilityOneReducer,
  abilityTwo: abilityTwoReducer,
  abilityThree: abilityThreeReducer,
  version: updateVersionReducer,
});

export default reducers;
