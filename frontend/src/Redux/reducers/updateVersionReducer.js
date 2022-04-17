import { UPDATE_VERSION } from '../actionList';

const updateVersionReducer = (
  state = { data: { globalVersion: 'red-blue', localVersion: 'red' } },
  action
) => {
  switch (action.type) {
    case UPDATE_VERSION:
      return { ...action.version };
    default:
      return state;
  }
};

export default updateVersionReducer;
