import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import withRedux, { createWrapper } from "next-redux-wrapper";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};

// const makeStore = (initialState = {}) =>
//   createStore(rootReducer, initialState, applyMiddleware(thunk, logger));

const makeStore = (initialState = {}) => {
  const persistConfig = {
    key: "root",
    storage: storage,
  };

  const pReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    pReducer,
    initialState,
    applyMiddleware(thunk, logger)
  );
  store.__persistor = persistStore(store);
  return store;
};

export default makeStore;
// const wrapper = createWrapper(makeStore);
// export default wrapper;
