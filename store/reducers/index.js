import { combineReducers } from "redux";

import UserAuthenticate from "./Auth";
import NamesReducer from "./Names";
import ProfileReducer from "./Profile";

// const appReducer = combineReducers({
//   user: UserAuthenticate,
// });

// const rootReducer = (state, action) => {
//   return appReducer(state, action);
// };

const rootReducer = combineReducers({
  user: UserAuthenticate,
  data: NamesReducer,
  profile: ProfileReducer,
});

// const rootReducer = (state, action) => {
//   return appReducer(state, action);
// };

export default rootReducer;
