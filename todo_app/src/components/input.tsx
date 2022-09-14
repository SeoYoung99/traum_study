import React, { useEffect } from "react";
import { useState } from 'react';
import { todoItem } from "../App";

function Input( props : { addItem: (item: todoItem) => void; } ){
    
    let today = new Date();
    let TodayDate = today.toLocaleDateString();
    let date = TodayDate;
   
    const [inputText, setInputText] = useState(''); //input text
    const [inputDate, setInputDate] = useState(date);
    const [item, setItem] = useState<todoItem>({title: inputText, date: inputDate, status: false}); 
    
    useEffect(()=>{
        let inputItem: todoItem = {title: inputText, date: inputDate, status: false}
        setItem(inputItem)
    },[inputText, inputDate])

    return (
        <div>
            <input value={inputText} placeholder="내용을 입력하세요" onChange={(e)=>{setInputText(e.target.value)}}/> 
            <input value={inputDate} placeholder="날짜를 입력하세요" onChange={(e)=>{setInputDate(e.target.value);}}/> 
            
            {inputText}
            {inputDate}
            
            <button onClick={(e)=>{console.log(item); props.addItem(item); setInputDate(''); setInputText('')}}>
                +
        </button>
        </div>
    )
}

export default Input;