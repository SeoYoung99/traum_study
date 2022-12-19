import {createPortal} from 'react-dom';
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import Modal from "./modal";
import {DeleteModal, isBasic, isDeleteItem} from "../../store/modal/modalreducer";

const ModalContainer: React.FC = () => {
    //여기에서 무슨 모달을 띄울지 결정한다 [key]사용
    const modals = useSelector((state :RootState)=> state.modal.modalList)

    return createPortal(
        modals.map((modal) => {
            if(isDeleteItem(modal)) {
                return <Modal key={modal.key} id={modal.id} props={modal.props}/>
            }
            if(isBasic(modal)){
                return <Modal key={modal.key} props={modal.props}/> //basic
            }
            return null
        }), document.getElementById('root') as HTMLElement
    )
}
export default ModalContainer;
