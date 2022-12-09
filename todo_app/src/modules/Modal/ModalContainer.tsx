import {createPortal} from 'react-dom';
import React from "react";
import Modal, {Props} from "./modal";

const ModalContainer: React.FC<Props> = ({ id, setModalVisible}) => {
    return createPortal(<Modal setModalVisible={ setModalVisible} id={id} />, document.getElementById('root') as HTMLElement)
}
export default ModalContainer;
