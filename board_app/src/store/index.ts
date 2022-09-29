import { combineReducers } from "redux";
import postReducer from "./reducer/reducer";
import {store} from "../../pages/_app";

const rootReducer = combineReducers({
    postReducer
});

export default rootReducer

export type RootState = ReturnType<typeof store.getState>