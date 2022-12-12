import { todoItem } from "../../App";
//타입세이프 액션의 ActionType을 통해서 actions.ts에 정의한 Action Type들을 Action Type으로 온전히 정의
import { ActionType } from "typesafe-actions";
import * as actions from './actions'

//actions.ts파일에서 정의한 액션들을 온전하게 정의 
export type TodoAction = ActionType<typeof actions>

//store에서 관리할 state에 대한 type 정의
export type TodoType = { todo: Array<todoItem>}
