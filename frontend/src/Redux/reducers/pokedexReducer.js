import { NEW_POKDEX_ENTRY } from '../actionList';

const pokedexReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_POKDEX_ENTRY:
      return { ...action.pokedex };
    default:
      return state;
  }
};

export default pokedexReducer;
