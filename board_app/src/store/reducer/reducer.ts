import {
    createAction
    , ActionType
    , createReducer
} from 'typesafe-actions';
import {ADD_POST_ITEM, DELETE_POST_ITEM, DELETE_POST_ITEMS, UPDATE_ID, UPDATE_POST_ITEM} from '../actions/actions';
import {postActions, postItem, postStoreType} from '../types/types';
import {compose, createStore, PreloadedState, Store} from "redux";
import rootReducer, {RootState} from "../index";

const initialState: postStoreType = { postList : [], writeID: 0 }

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const deletePosts = (removeList: number[], postList: postItem[]) =>{
    postList.map((item)=>{
        if(removeList.includes(item.id)){
            let i = postList.indexOf(item)
            postList.splice(i,1)
        }
    })
    console.log('remove',postList)
    return postList
}
//state.todo.filter(item => item.id !== action.payload.id)
// 리듀서 추가
const postReducer = createReducer<postStoreType, postActions>(initialState, {
    [ADD_POST_ITEM]: (state, action) =>({
        ...state,
        postList : [...state.postList, action.payload.post],
    }),
    [DELETE_POST_ITEM]: (state, action) =>({
        ...state,
        postList : [...state.postList.slice(0,action.payload.index),...state.postList.slice(action.payload.index+1)]
    }),
    [DELETE_POST_ITEMS]: (state, action) =>({
        ...state,
        postList : deletePosts(action.payload.removePostsList, state.postList)
    }),
    [UPDATE_POST_ITEM]: (state, action) =>({
        ...state,
        postList : [...state.postList.slice(0,action.payload.index),action.payload.newPost, ...state.postList.slice(action.payload.index+1)]
    }),
    [UPDATE_ID]: (state, action) => ({
        ...state,
        writeID: state.writeID+1
    })
})

export default postReducer;