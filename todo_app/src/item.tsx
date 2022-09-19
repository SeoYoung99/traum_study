import React from "react";
import {useState} from 'react'
import { useDispatch } from "react-redux";
import { todoItem } from './App'
import { changeStatus } from "./modules/todos/actions";

function Item({id, title, date, status} : todoItem) {

    const dispatch = useDispatch();
    
    const changeItem = React.useCallback(
        (id: number)=> dispatch(changeStatus({id})) ,[dispatch]
    )

    return(
        <div style={status? {textDecorationLine:'line-through'} : {}} key={id}>
            <button onClick={()=>
                changeItem(id)}>{status? '해제':'완료'
                }</button> 
            {title}
            {date}
        </div>
    )
}
export default Item;