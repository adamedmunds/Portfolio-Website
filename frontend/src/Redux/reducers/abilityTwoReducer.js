import { UPDATE_ABLITY_TWO_DATA } from '../actionList';

const abilityTwoReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ABLITY_TWO_DATA:
      return { ...action.abilityTwo };
    default:
      return state;
  }
};

export default abilityTwoReducer;
