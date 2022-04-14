import { UPDATE_ABLITY_THREE_DATA } from '../actionList';

const abilityThreeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ABLITY_THREE_DATA:
      return { ...action.abilityThree };
    default:
      return state;
  }
};

export default abilityThreeReducer;
