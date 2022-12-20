import React, {useCallback} from "react";
import styled from "styled-components";
import {useAppDispatch} from "../../index";
import {deleteTodoThunk} from "../../store/todos/actions";
import {removeModal} from "../../store/modal/modalaction";

const ModalWrapper = styled.div`
  //중앙 정렬
  position: absolute;
  top: 0;
  left: 0;
  height: 100%; /*100%*/
  width: 100%; /*100%*/
  display: flex;
  justify-content: center;
  align-items: center;
`
const DimWrapper = styled.div`
  //중앙 정렬
  height: 100%; /*100%*/
  width: 100%; /*100%*/
  display: flex;
  z-index: 1;
  background-color: white;
  opacity: 30%;
`
const Content = styled.div`
  box-sizing: border-box;
  position: fixed;
  width: 500px;
  height: 300px;
  background-image: linear-gradient(to top, #feada6 0%, #f5efef 100%);
  padding: 100px;
  text-align: center;
  border-radius: 50px;
  z-index: 2;
`
const ButtonWrapper = styled.div`
  padding: 40px;
  display: flex;
  justify-content: space-around;
`
const ConfirmBtn = styled.button`
  border: none;
  border-radius: 10px;
  width: 70px;
  height: 50px;
  cursor: pointer;
  
  :hover{
    box-shadow: 3px 3px 3px lightcoral;
  }
`
export interface Props {
    id? : number,
    props : { text : string }
}
const Modal = ({ id, props } : Props) => {

    const dispatch = useAppDispatch();
    const deleteModal = id != null

    const onCancelClick = useCallback(() => {
        dispatch(removeModal())
    },[dispatch])

    const onConfirmClick = useCallback(() => {
        if (deleteModal) {
            dispatch(deleteTodoThunk(id))
        }
        dispatch(removeModal())
    },[deleteModal, dispatch, id])

     return(
            <ModalWrapper>
                <DimWrapper/>
                <Content >
                    {props.text}
                    <ButtonWrapper>
                        {deleteModal?
                            <ConfirmBtn onClick={onCancelClick}>
                                취소
                            </ConfirmBtn>
                            :
                            <></> }
                        <ConfirmBtn onClick={onConfirmClick}>
                            확인
                        </ConfirmBtn>
                    </ButtonWrapper>
                </Content>
            </ModalWrapper>
     )
}
export default Modal
