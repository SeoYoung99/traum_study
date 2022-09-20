import { todoItem } from '../../App'
//typesafe-actions패키지 설치 후 import
import { Action, createAction} from "typesafe-actions";
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';


//Ation 정의 (리덕스 액션에 들어갈)
export const ADD_TODO = "todo/ADD_TODO";
export const CHANGE_STATUS = 'todo/CHANGE_STATUS'
export const DELETE_TODO = "todo/DELETE_TODO";

//Action 생성 함수 구현 
// 첫번째 인자: Action Type, 두번째 인자: payload(액션함수의 파라미터), 세번째 인자: Action Type인데 자동으로 적용
export const addTodo = createAction(ADD_TODO)<{todo: todoItem;}>();
export const changeStatus = createAction(CHANGE_STATUS)<{id : number;}>();
export const deleteTodo = createAction(DELETE_TODO)<{id: number;}>();

export const deleteTodoThunk = (id: number): ThunkAction<void, RootState, null, Action> => {
    return (dispatch, getState) => {
        const list = getState().todo.todo 

        //id가 해당 번호인 값의 상태가 참이면 삭제 dispatch
        list.forEach((val)=>{
            if((val.id === id)&&(val.status === true)){
                dispatch(deleteTodo({id : id}))
            }
        })   
    }
}





