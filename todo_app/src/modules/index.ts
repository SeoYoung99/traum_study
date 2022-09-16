//리덕스 적용!!!
//action.ts, reducer.ts, types.ts를 묶어야함

import {combineReducers} from 'redux';
import todo from './todos/reducer';
import { TodoType } from './todos/types';

export type RootState = {
  todo: TodoType;
}

const rootReducer = combineReducers({
  todo,
})

export default rootReducer;