import { UPDATE_THEME } from '../actionList';

const themeReducer = (state = { theme: 'dark' }, action) => {
  switch (action.type) {
    case UPDATE_THEME:
      return { ...action.theme };
    default:
      return state;
  }
};

export default themeReducer;
