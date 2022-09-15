import React, { useEffect } from "react";
import { useState } from 'react';
import { todoItem } from "../App";

function Input( props : { addItem: (item: todoItem) => void; } ){
    
    let today = new Date();
    let TodayDate = today.toLocaleDateString();
    let date = TodayDate;
   
    const [key,setKey] = useState(0)
    const [inputText, setInputText] = useState(''); //input text
    const [inputDate, setInputDate] = useState(date);
    const [item, setItem] = useState<todoItem>({key: key, title: inputText, date: inputDate, status: false}); 
    
    useEffect(()=>{
        let inputItem: todoItem = {key: key, title: inputText, date: inputDate, status: false}
        setItem(inputItem)
    },[inputText, inputDate, key])

    return (
        <div>
            <input value={inputText} placeholder="내용을 입력하세요" onChange={(e)=>{setInputText(e.target.value)}}/> 
            <input value={inputDate} placeholder="날짜를 입력하세요" onChange={(e)=>{setInputDate(e.target.value);}}/> 
            <button onClick={(e)=>{
                props.addItem(item); 
                setInputDate(date); 
                setInputText(''); 
                let newKey = key+1; 
                setKey(newKey)
                }
            }>
            +
            </button>
        </div>
    )
}

export default Input;