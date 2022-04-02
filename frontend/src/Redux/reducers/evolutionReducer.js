import { NEW_POKEMON_EVO_CHAIN } from '../actionList';

const evolutionReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_POKEMON_EVO_CHAIN:
      return { ...action.evolutionData };
    default:
      return state;
  }
};

export default evolutionReducer;
