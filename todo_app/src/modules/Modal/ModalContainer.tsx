import {createPortal} from 'react-dom';
import React from "react";
import Modal, {Props} from "./modal";

const ModalContainer: React.FC<Props> = ({ id, setIsVisible}) => {
    return createPortal(<Modal setIsVisible={ setIsVisible} id={id} />, document.getElementById('root') as HTMLElement)
}
export default ModalContainer;
