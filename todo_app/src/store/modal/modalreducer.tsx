import {createReducer} from "typesafe-actions";
import {ModalAction} from "./modalaction";

export interface BasicModal{
    key: string
    props: { text : string }
}
export interface DeleteModal extends BasicModal{
    id: number
}
//DeletModal이 BasicModal을 상속하고 있으므로  BasicModal로 추론된다.
type ModalList = DeleteModal | BasicModal //ModalList = DeleteModal[] | BasicModal[]

export interface ModalType {
    modalList : ModalList[]
}
const initialState : ModalType = {modalList: []}

//사용자 정의 Type Guard
export const isDeleteItem = (modal : ModalList) : modal is DeleteModal => {
    return modal.key === 'delete' //
}
export const isBasic = (modal: ModalList) => {
    return modal.key === 'noInput'
}

const modal = createReducer<ModalType, ModalAction>(initialState,
    {
        ADD_DELETE_MODAL: (state, action) => ({
            ...state,
            modalList: state.modalList.concat(action.payload)
        }),
        ADD_NO_INPUT_MODAL: (state,action) => ({
            ...state,
            modalList : state.modalList.concat(action.payload)
        }),
        REMOVE_MODAL: (state, action) => ({
            ...state,
            modalList: []
        })
    })
export default modal

