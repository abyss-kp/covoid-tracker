import rootReducer from './reducers/index';
import { composeWithDevTools } from "redux-devtools-extension";

import { createStore } from "redux";

export var Store = createStore(
  rootReducer,
  composeWithDevTools()
);