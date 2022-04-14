import {UPDATE_ABLITY_ONE_DATA} from "../actionList";

const abilityOneReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ABLITY_ONE_DATA:
      return { ...action.abilityOne };
    default:
      return state;
  }
};

export default abilityOneReducer;