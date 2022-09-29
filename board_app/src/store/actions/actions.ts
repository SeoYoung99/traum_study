// 액션타입 선언
import { createAction } from "typesafe-actions";
import { postItem } from "../types/types";
export const DELETE_POST_ITEM = "post/DELETE_POST_ITEM";;
export const ADD_POST_ITEM = "post/ADD_POST_ITEM";
export const UPDATE_POST_ITEM = "post/UPDATE_POST_ITEM";;
export const UPDATE_ID = 'post/UPDATE_ID'
// 액션함수 선언
export const deletePost = createAction(DELETE_POST_ITEM)<{id: number}>();
export const addPost = createAction(ADD_POST_ITEM)<{post: postItem}>()
export const updateID = createAction(UPDATE_ID)<{}>();
export const updatePost = createAction(UPDATE_POST_ITEM)<{id : number, newpost: postItem}>()
