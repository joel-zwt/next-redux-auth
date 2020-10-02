import { combineReducers } from "redux";

import UserAuthenticate from "./Auth";

// const appReducer = combineReducers({
//   user: UserAuthenticate,
// });

// const rootReducer = (state, action) => {
//   return appReducer(state, action);
// };

const rootReducer = combineReducers({
  user: UserAuthenticate,
});

// const rootReducer = (state, action) => {
//   return appReducer(state, action);
// };

export default rootReducer;
