import { combineReducers } from "redux";

import UserAuthenticate from "./Auth";
import NamesReducer from "./Names";

// const appReducer = combineReducers({
//   user: UserAuthenticate,
// });

// const rootReducer = (state, action) => {
//   return appReducer(state, action);
// };

const rootReducer = combineReducers({
  user: UserAuthenticate,
  data: NamesReducer,
});

// const rootReducer = (state, action) => {
//   return appReducer(state, action);
// };

export default rootReducer;
