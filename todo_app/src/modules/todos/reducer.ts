//import { todoItem } from "../../App";
//실질적으로 Action들이 어떤 기능을 하는지 구현
import { TodoAction, TodoType } from "./types"; //정의한 타입들 불러오기
import { ADD_TODO, DELETE_TODO } from "./actions"; //정의한 액션 타입들도 불러오기
import { createReducer } from "typesafe-actions"; //기존에 switch/case문을 통해 작성했던 리듀서를 객체형식으로 구현
import produce from 'immer'; // ...문법을 사용해 불변성을 유지했었는데 produce함수는 2개의 인자를 설정하면 알아서 불변성 관리

const initialState : TodoType = {todo : []}

//Reducer함수 구현
//(제네릭: 클래스나 함수에서 사용할 타입을 결정) Todo와 TodoAction 타입을 사용 
const todo = createReducer<TodoType, TodoAction>(initialState,{ 
    //인자로 초기상태와 object

    [ADD_TODO] : (state, action) => ({
        ...state,
        todo : [...state.todo, action.payload.todo]
    })
    ,
    [DELETE_TODO] : (state, action) => ({
        ...state,
        todo : state.todo.filter(item => item.id !== action.payload.id)
    })
})

export default todo;
