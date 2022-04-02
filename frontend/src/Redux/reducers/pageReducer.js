import { UPDATE_PAGE } from '../actionList';

const pageReducer = (state = { data: 1 }, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return { ...action.pageData };
    default:
      return state;
  }
};

export default pageReducer;
