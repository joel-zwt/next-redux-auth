import * as ActionTypes from "../action-types/auth";

const initialState = {
  isAuthenticated: false,
  email: null,
  token: null,
};

const UserAuthenticate = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.USER_LOGIN:
      return userLogin(state, payload);
    case ActionTypes.USER_LOGOUT:
      return userLogout(state);
    case ActionTypes.USER_AUTH_CHECK:
      return userAuthCheck(state);
    case ActionTypes.USER_SIGNUP:
      return userSignUp(state, payload);
    // case ActionTypes.USER_DATA:
    //   return userData(state, payload);
    // case HYDRATE: {
    //   return { ...state, ...payload };
    // }
    default:
      return state;
  }
};

const userLogin = (state, payload) => {
  state = {
    ...state,
    isAuthenticated: true,
    token: payload.token,
    email: payload.email,
  };
  return state;
};

const userSignUp = (state, payload) => {
  state = {
    ...state,
    isAuthenticated: true,
    token: payload.token,
    email: payload.email,
  };
  return state;
};

const userLogout = (state) => {
  state = {
    ...state,
    isAuthenticated: false,
    token: null,
    email: null,
  };
  return state;
};

const userAuthCheck = (state) => {
  state = {
    ...state,
    isAuthenticated: true,
  };
  return state;
};

// const userData = (state, payload) => {
//   state = {
//     ...state,
//     name: payload.name,
//     email: payload.email,
//   };
//   return state;
// };

export default UserAuthenticate;
