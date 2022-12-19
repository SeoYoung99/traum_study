import {ActionType, createAction} from "typesafe-actions";
import {BasicModal, DeleteModal} from "./modalreducer";

export const addDeleteModal = createAction('ADD_DELETE_MODAL')<DeleteModal>();
export const addNoInputModal = createAction('ADD_NO_INPUT_MODAL')<BasicModal>();
export const removeModal = createAction('REMOVE_MODAL')();

const actionTypes = { addDeleteModal, addNoInputModal, removeModal }

export type ModalAction = ActionType<typeof actionTypes>
