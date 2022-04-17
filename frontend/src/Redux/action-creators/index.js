import {
  AUTH_USER,
  LOGOUT_USER,
  NEW_CURRENT_POKEMON_DATA,
  NEW_POKDEX_ENTRY,
  NEW_POKEMON_EVO_CHAIN,
  UPDATE_COLOR,
  UPDATE_PAGE,
  UPDATE_THEME,
  UPDATE_VERSION,
} from '../actionList';
import axios from 'axios';

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

export const updateVersion = (version, localVersion) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_VERSION,
      version: { data: { globalVersion: version, localVersion: localVersion } },
    });
  };
};
