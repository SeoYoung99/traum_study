import React from "react";
import {useState} from 'react'
import { useDispatch } from "react-redux";
import { todoItem } from './App'
import { changeStatus } from "./modules/todos/actions";
import styled from "styled-components";

const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  text-align: start;
  font-size: medium;
  padding: 10px 0;
  overflow-wrap: break-word;
  color: white;
  text-decoration: ${({isCompleted}:{isCompleted : boolean})=>(isCompleted? 'line-through':'')};
`
function Item({id, title, date, isCompleted} : todoItem) {
    return(
        <div
            key={id}
            >
            <Input value={title} isCompleted={isCompleted}/>
            {/*<button onClick={()=>*/}
            {/*    changeItem(id)}>{status? '해제':'완료'*/}
            {/*    }</button>*/}
            
            {id}
            {title}
            {date}
        </div>
    )
}
export default Item;
