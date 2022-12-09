import React from "react";
import { todoItem } from './App'
import styled from "styled-components";

const TodoItem = styled.div`
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
function Item({id, title, isCompleted} : todoItem) {
    return(
        <div key={id}>
            <TodoItem isCompleted={isCompleted}>
                {title}
            </TodoItem>
        </div>
    )
}
export default Item;
