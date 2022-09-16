import { todoItem } from '../../App'
//typesafe-actions패키지 설치 후 import
import { createAction } from "typesafe-actions";


//Ation 정의 (리덕스 액션에 들어갈)
export const ADD_TODO = "todo/ADD_TODO";
export const DELETE_TODO = "todo/DELETE_TODO";

//Action 생성 함수 구현 
// 첫번째 인자: Action Type, 두번째 인자: payload(액션함수의 파라미터), 세번째 인자: Action Type인데 자동으로 적용
export const addTodo = createAction(ADD_TODO)<{todo: todoItem;}>();
export const deleteTodo = createAction(DELETE_TODO)<{id: number;}>()

