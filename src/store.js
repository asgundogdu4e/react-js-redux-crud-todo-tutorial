import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import logger from "redux-logger";
import reduxPromiseMiddleware from "redux-promise-middleware";

const initialState = {};

const composedEnhancer = composeWithDevTools(
  applyMiddleware(reduxPromiseMiddleware, thunkMiddleware, logger)
);

const store = createStore(rootReducer, initialState, composedEnhancer);

export default store;