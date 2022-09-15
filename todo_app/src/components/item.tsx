import React from "react";
import {useState} from 'react'
import { todoItem } from "../App";

function Item({key, title, date, status} : todoItem) {

    const [done, setDone] = useState(false);

    return(
        <div style={done? {textDecorationLine:'line-through'} : {}}>
        <button onClick={()=>setDone(!done)}>{done? '해제':'완료'}</button> 
        {title}
        {date}
        {status}
        </div>
    )
}
export default Item;