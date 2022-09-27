import { ActionType } from "typesafe-actions";
import { postItem } from "../../../pages";
import * as actions from '../actions/actions'

// 상태 초기화
export interface postType { postList :postItem[] }


// 액션 객체타입
export type postActions = ActionType<typeof actions>;