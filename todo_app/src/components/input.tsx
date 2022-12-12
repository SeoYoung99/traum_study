import React, { useEffect } from "react";
import { useState } from 'react';
import { todoItem } from "../App";

//리덕스 접근
import {useDispatch} from 'react-redux';
import {addTodo} from '../store/todos/actions';
import styled from "styled-components";
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
`

function Input(){

    //리덕스 스토어에 설정된 action에 대한 dispatch를 연결하는 Hook
    const dispatch = useDispatch();

    const updateTodo = React.useCallback(
        (todo: todoItem) => dispatch(addTodo({todo: todo})),[dispatch]
    )
    
    let today = new Date();
    let TodayDate = today.toLocaleDateString();
    let date = TodayDate;
   
    const [id,setId] = useState(0)
    const [inputText, setInputText] = useState(''); //input text
    const [inputDate, setInputDate] = useState(date);
    const [item, setItem] = useState<todoItem>({id: id, title: inputText, date: inputDate, isCompleted: false});
    
    useEffect(()=> {
        let inputItem: todoItem = {id: id, title: inputText, date: inputDate, isCompleted: false}
        setItem(inputItem)
    },[inputText, inputDate, id])

    return (
        <InputWrapper>
            <InputText value={inputText} placeholder="내용을 입력하세요" onChange={(e)=>{setInputText(e.target.value)}}/>
            <AddButton onClick={(e)=> {
                e.preventDefault();
                updateTodo(item);
                setInputDate(date);
                setInputText('');
                let newId = id+1;
                setId(newId)
                }
            }
            >Add Todo
            </AddButton>
        </InputWrapper>

    )
}

export default Input;
