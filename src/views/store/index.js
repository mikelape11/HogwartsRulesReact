import { createStore, combineReducers } from "redux";
import loadauth from "./reducers/auth";
const reducers = combineReducers({
  loadauth,
});

export default createStore(reducers);
