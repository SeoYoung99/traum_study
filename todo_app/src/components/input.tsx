import React, {useCallback, useRef} from "react";
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import {addTodo} from '../store/todos/actions';
import styled from "styled-components";
import {todoItem} from "../store/todos/reducer";
import {addNoInputModal} from "../store/modal/modalaction";

export const InputWrapper =styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  margin-bottom: 50px;
`
const InputText = styled.input`
  box-sizing: border-box;
  height: 100%;
  width: 400px;
  border: solid 3px rebeccapurple;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  padding: 10px;
  background-color: #222021;
  color: white;
  &:focus{
    outline: none;
  }
`
const AddButton = styled.button`
  height: 100%;
  width: 100px;
  background: linear-gradient(to right, rebeccapurple, pink);
  border: none;
  color: white;
  font-size: medium;
  font-weight: bold;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
  :focus{
    border: none;
  }
  :disabled{
    opacity: 0.5;
  }
`

const Input = () => {

    const dispatch = useDispatch();

    const today = new Date(); //현재 날짜
    const date = today.toLocaleDateString();

    const [id,setId] = useState(0)
    const [inputText, setInputText] = useState(''); //input text
    const [inputDate, setInputDate] = useState(date);

    const onAddClick = useCallback(() => {
        if(inputText === ''){
            dispatch(addNoInputModal(
                {
                    key: 'noInput',
                    props: {text: '내용이 없습니다!'
                    }}))
        }
        else{
            const item : todoItem = {id: id, title: inputText, date: inputDate, isCompleted: false}
            //새로운 아이템 추가 액션 생성
            dispatch(addTodo({todo : item}))
            //아이템 다시 초기화, id는 1증가
            setInputDate(date);
            setInputText('');
            const newId = id+1;
            setId(newId)
        }
    },[date, dispatch, id, inputDate, inputText])

    const ref = useRef<HTMLInputElement>(null)

    if(ref.current){ //addTodo Input 창에 포커스
        ref.current.focus()
    }

    return (
        <InputWrapper>
            <InputText
                value={inputText}
                placeholder="내용을 입력하세요"
                autoFocus={true}
                ref={ref}
                onChange={(e) => {setInputText(e.target.value)}}
            />
            <AddButton onClick={onAddClick}
            >Add Todo
            </AddButton>
        </InputWrapper>

    )
}

export default Input;
