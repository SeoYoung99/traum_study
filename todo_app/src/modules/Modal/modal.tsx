import React, {useState} from "react";
import styled from "styled-components";
import {isVisible} from "@testing-library/user-event/dist/utils";
import {useAppDispatch} from "../../index";
import {deleteTodoThunk} from "../todos/actions";

const ModalWrapper = styled.div`
  //중앙 정렬
  position: fixed;
  top: 0;
  bottom: 200px;
  left: 0;
  right: 0;
  width: 400px;
  height: 300px;
  margin: auto;
  background-color: lightcyan;
  border-radius: 10%;
`
const Content = styled.div`
  padding: 40px;
`
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  box-sizing: border-box;
  display: flex ;
  justify-content: space-around;
  width: 100%;
  padding: 10% 20%;
`
const ConfirmBtn = styled.button`
  width: 70px;
  height: 60px;
  background-color: mediumpurple;
  border: none;
`

export interface Props {
    id : number,
    setIsVisible : (val : boolean) => void
}
const Modal = ({ id, setIsVisible} : Props) => {

    const dispatch = useAppDispatch();
    const onClickConfirm = (id: number) => {
        dispatch(deleteTodoThunk(id))
        setIsVisible(false)
    }
    // const onClickConfirm = () => {
    //     if(window.confirm('삭제하시겠습니까?')){
    //         alert('ok')
    //     }else{
    //         alert('cancel')
    //     }
    // }
     return(
            <ModalWrapper>
                <Content>
                    게시물을 삭제하시겠습니까?
                </Content>
                <ButtonWrapper>
                    <ConfirmBtn onClick={() => setIsVisible(false)}>
                        취소
                    </ConfirmBtn>
                    <ConfirmBtn onClick={() => onClickConfirm(id) }>
                        확인
                    </ConfirmBtn>
                </ButtonWrapper>
            </ModalWrapper>
     )
}
export default Modal
