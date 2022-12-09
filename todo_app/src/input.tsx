import React, { useEffect } from "react";
import { useState } from 'react';
import { todoItem } from "./App";

//리덕스 접근
import {useDispatch} from 'react-redux';
import {addTodo} from './modules/todos/actions';
import styled from "styled-components";
export const InputWrapper =styled.div`
  display: flex;
  justify-content: center;
  height: 50px;
  margin-bottom: 50px;
  visibility: ${({mode} : {mode:boolean}) => mode? 'hidden':''} ;
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
`
interface mode {
    mode: boolean
}
function Input({mode}: mode){

    //리덕스 스토어에 설정된 action에 대한 dispatch를 연결하는 Hook
    const dispatch = useDispatch();

    const updateTodo = React.useCallback(
        
        (todo: todoItem) => dispatch(addTodo({todo: todo})),[dispatch]
        //action을 감지할 때만 함수 생성, 
        //addTodo액션을 감지해서 실행
    )
    
    let today = new Date();
    let TodayDate = today.toLocaleDateString();
    let date = TodayDate;
   
    const [id,setid] = useState(0)
    const [inputText, setInputText] = useState(''); //input text
    const [inputDate, setInputDate] = useState(date);
    const [item, setItem] = useState<todoItem>({id: id, title: inputText, date: inputDate, isCompleted: false});
    
    useEffect(()=>{
        let inputItem: todoItem = {id: id, title: inputText, date: inputDate, isCompleted: false}
        setItem(inputItem)
        console.log(inputItem)
    },[inputText, inputDate, id])

    return (
        <InputWrapper mode={mode}>
            <InputText value={inputText} placeholder="내용을 입력하세요" onChange={(e)=>{setInputText(e.target.value)}}/>
            <AddButton onClick={(e)=>{
                e.preventDefault();
                updateTodo(item);
                setInputDate(date);
                setInputText('');
                let newid = id+1;
                setid(newid)
                }
            }
            >Add Todo
            </AddButton>
        </InputWrapper>

    )
}

export default Input;
