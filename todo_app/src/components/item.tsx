import React from "react";
import { todoItem } from "../App";

function Item({title, date, status} : todoItem) {
    return(
        <>
        {title}
        {date}
        {status}
        <button>삭제</button>
        </>
    )
}
export default Item;