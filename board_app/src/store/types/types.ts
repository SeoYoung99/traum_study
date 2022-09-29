import { ActionType } from "typesafe-actions";
import * as actions from '../actions/actions'
import { RootState} from "../index";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export type postItem = {
    id: number,
    title: string,
    context: string,
    date: string
  }
  
// 상태 초기화
export type postStoreType = { postList :postItem[], writeID: number }


// 액션 객체타입 (alias생성)
export type postActions = ActionType<typeof actions>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
