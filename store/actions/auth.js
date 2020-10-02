import * as ActionTypes from "../action-types/auth";

export const userLogin = (payload) => {
  return {
    type: ActionTypes.USER_LOGIN,
    payload,
  };
};

export const userSignUp = (payload) => {
  return {
    type: ActionTypes.USER_SIGNUP,
    payload,
  };
};

export const userLogout = () => {
  return {
    type: ActionTypes.USER_LOGOUT,
  };
};

export const userAuthCheck = () => {
  return {
    type: ActionTypes.USER_AUTH_CHECK,
  };
};

// export const userData = (payload) => {
//   return {
//     type: ActionTypes.USER_DATA,
//     payload,
//   };
// };
