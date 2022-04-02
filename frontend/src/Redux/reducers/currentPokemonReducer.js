import { NEW_CURRENT_POKEMON_DATA } from '../actionList';

const currentPokemonReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_CURRENT_POKEMON_DATA:
      return { ...action.currentPokemon };
    default:
      return state;
  }
};

export default currentPokemonReducer;
