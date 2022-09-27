// 액션타입 선언
import { createAction } from "typesafe-actions";
import { postItem } from "../../../pages";

//export const RESET_TEXT = "testReducer/RESET_TEXT";
export const ADD = "post/ADD";
//export const REMOVE_TEXT = "testReducer/REMOVE_TEXT";

// 액션함수 선언
//export const resetText = createAction(RESET_TEXT)();
export const addPost = createAction(ADD)<{post: postItem}>()
//export const removeText = createAction(REMOVE_TEXT)()
