import {createReducer} from "typesafe-actions";
import {ModalAction} from "./modalaction";

// export const addDeleteModal = createAction('ADD_DELETE_MODAL')<DeleteModal>();
// export const addNoInputModal = createAction('ADD_NO_INPUT_MODAL')<BasicModal>();

export interface BasicModal{
    key: string
    props: { text : string }
}
export interface DeleteModal extends BasicModal{
    id: number
    //key
    //props
}
type ModalList = DeleteModal | BasicModal

export interface ModalType {
    modalList : ModalList[]
}
const initialState : ModalType = {modalList: []}

export const isDeleteItem = (modal: ModalList) : modal is DeleteModal => {
    return modal.key === 'delete'
}
export const isBasic = (modal: ModalList) => {
    return modal.key === 'noInput'
}

const modal = createReducer<ModalType, ModalAction>(initialState,
    {
        ADD_DELETE_MODAL: (state, action) => ({
            ...state,
            modalList: state.modalList.concat({key: 'delete', id: action.payload.id, props: action.payload.props})
        }),
        ADD_NO_INPUT_MODAL: (state,action) => ({
            ...state,
            key: 'noInput',
            modalList : state.modalList.concat({key: 'noInput', props: action.payload.props})
        }),
        REMOVE_MODAL: (state, action) => ({
            ...state,
            key: 'remove_modal',
            modalList: []
        })
    })
export default modal

