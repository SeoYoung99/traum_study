import React, { useEffect } from "react";
import { useState } from 'react';
import { todoItem } from "./App";

//리덕스 접근
import {useDispatch} from 'react-redux';
import {addTodo} from './modules/todos/actions';

function Input(){

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
    const [item, setItem] = useState<todoItem>({id: id, title: inputText, date: inputDate, status: false}); 
    
    useEffect(()=>{
        let inputItem: todoItem = {id: id, title: inputText, date: inputDate, status: false}
        setItem(inputItem)
    },[inputText, inputDate, id])

    return (
        <div>
            <input value={inputText} placeholder="내용을 입력하세요" onChange={(e)=>{setInputText(e.target.value)}}/> 
            <input value={inputDate} placeholder="날짜를 입력하세요" onChange={(e)=>{setInputDate(e.target.value);}}/> 
            <button onClick={(e)=>{
                // props.addItem(item); 
                console.log(item)
                e.preventDefault();
                updateTodo(item);
                setInputDate(date); 
                setInputText(''); 
                let newid = id+1; 
                setid(newid)
                }
            }>
            +
            </button>
        </div>
    )
}

export default Input;