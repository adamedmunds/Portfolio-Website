import { UPDATE_COLOR } from "../actionList";

const colorReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return { ...action.color };
    default:
      return state;
  }
};

export default colorReducer;