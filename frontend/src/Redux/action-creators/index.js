import {
  AUTH_USER,
  LOGOUT_USER,
  NEW_POKDEX_ENTRY,
  UPDATE_COLOR,
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

export const newColor = (color, luma) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_COLOR,
      color: { color: color, luma: luma },
    });
  };
};
