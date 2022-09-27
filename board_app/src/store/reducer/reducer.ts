import {
    createAction
    , ActionType
    , createReducer
} from 'typesafe-actions';
import { ADD } from '../actions/actions';
import { postActions, postType } from '../types/types';

const initialState: postType = { postList : [] }
// 리듀서 추가
const postReducer = createReducer<postType, postActions>(initialState, {
    [ADD]: (state, action) =>({
        ...state,
        postList : [...state.postList, action.payload.post]
    })
})

export default postReducer;