  
import {createStore, combineReducers} from "redux";
import {loadauth} from "./reducers";
const reducers = combineReducers({
    loadauth
});

export default createStore(reducers);