import {
  AUTH_USER,
  LOGOUT_USER,
  NEW_CURRENT_POKEMON_DATA,
  NEW_POKDEX_ENTRY,
  NEW_POKEMON_EVO_CHAIN,
  UPDATE_ABLITY_ONE_DATA,
  UPDATE_ABLITY_TWO_DATA,
  UPDATE_ABLITY_THREE_DATA,
  UPDATE_COLOR,
  UPDATE_PAGE,
  UPDATE_THEME,
  UPDATE_VERSION,
} from '../actionList';
import axios from 'axios';
import { isNull } from 'lodash';

export const authenticateUser = (user) => {
  return (dispatch) => {
    axios.get(`/api/v1/getUser?userId=${user.uid}`).then((res) => {
      dispatch({
        type: AUTH_USER,
        user: {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          isVerified: user.emailVerified,
          photo: user.photoURL || res.data.data.photo,
          metadata: user.metadata,
          role: res.data.data.role,
          activePokedexes: res.data.data.activePokedexes,
        },
      });
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER,
      user: {},
    });
  };
};

export const newPokedexEntry = (page) => {
  return (dispatch) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${page}`).then((res) => {
      dispatch({
        type: NEW_POKDEX_ENTRY,
        pokedex: { data: res.data },
      });
    });
  };
};

export const newPokedexEntryNoAPI = (data) => {
  return (dispatch) => {
    dispatch({
      type: NEW_POKDEX_ENTRY,
      pokedex: { data: data },
    });
  };
};

export const newColor = (color, luma, oldColor) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_COLOR,
      color: { color: color, luma: luma, originalColor: oldColor },
    });
  };
};

export const newEvoData = (url) => {
  return (dispatch) => {
    axios.get(url).then((res) => {
      dispatch({
        type: NEW_POKEMON_EVO_CHAIN,
        evolutionData: { data: res.data },
      });
    });
  };
};

export const newCurrentPokemonEntry = (data) => {
  return (dispatch) => {
    dispatch({
      type: NEW_CURRENT_POKEMON_DATA,
      currentPokemon: { data: data },
    });
  };
};

export const updatePage = (pageData) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PAGE,
      pageData: { data: pageData },
    });
  };
};

export const updateTheme = (theme) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_THEME,
      theme: { theme: theme },
    });
  };
};

export const updateAbilityOne = (abilityData) => {
  return (dispatch) => {
    axios
      .get(`https://pokeapi.co/api/v2/ability/${abilityData}`)
      .then((res) => {
        dispatch({
          type: UPDATE_ABLITY_ONE_DATA,
          abilityOne: { data: res.data },
        });
      });
  };
};

export const updateAbilityTwo = (abilityData) => {
  if (isNull(abilityData)) {
    return (dispatch) => {
      dispatch({
        type: UPDATE_ABLITY_TWO_DATA,
        abilityTwo: {},
      });
    };
  }
  return (dispatch) => {
    axios
      .get(`https://pokeapi.co/api/v2/ability/${abilityData}`)
      .then((res) => {
        dispatch({
          type: UPDATE_ABLITY_TWO_DATA,
          abilityTwo: { data: res.data },
        });
      });
  };
};

export const updateAbilityThree = (abilityData) => {
  if (isNull(abilityData)) {
    return (dispatch) => {
      dispatch({
        type: UPDATE_ABLITY_THREE_DATA,
        abilityThree: {},
      });
    };
  }
  return (dispatch) => {
    axios
      .get(`https://pokeapi.co/api/v2/ability/${abilityData}`)
      .then((res) => {
        dispatch({
          type: UPDATE_ABLITY_THREE_DATA,
          abilityThree: { data: res.data },
        });
      });
  };
};

export const updateVersion = (version) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_VERSION,
      version: { data: version },
    });
  };
};
