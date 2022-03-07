import { LOGOUT_USER, AUTH_USER } from "../actionList";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...action.user };
    case LOGOUT_USER:
      return { ...action.user };
    default:
      return state;
  }
};

export default userReducer;
