import { combineReducers } from "redux";
import postReducer from "./reducer/reducer";

const rootReducer = combineReducers({
    postReducer
});

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>;