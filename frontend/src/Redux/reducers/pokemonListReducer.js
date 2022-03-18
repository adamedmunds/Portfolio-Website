import { autocompleteData } from '../../Utils/Resources/AutocompleteData';

const pokedexReducer = (state = { data: autocompleteData }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default pokedexReducer;
