//리덕스 적용!!!
import {combineReducers} from 'redux';
import todo, {TodoType} from './todos/reducer';
import modal, {ModalType} from "./modal/modalreducer";

export type RootState = {
  todo: TodoType;
  modal: ModalType
}

const rootReducer = combineReducers({
  todo,
  modal
})

export default rootReducer;
