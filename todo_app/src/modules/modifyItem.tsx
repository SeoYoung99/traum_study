import React, {useState} from "react";
import {Style, todoItem} from "../App";
import styled from "styled-components";
import {modifyTodo} from "./todos/actions";
import {useAppDispatch} from "../index";
import {useSelector} from "react-redux";
import {RootState} from "./index";

const InputWrapper =styled.div`
  display: flex;
  justify-content: center;
  height: 70px;
`
const UpdateInput = styled.input`
  width: 400px;
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: ${({index}:{index : number})=> {
    switch (index % 4){
      case 0 : return ('#4facfe 3px solid')
      case 1 : return ('#fa709a 3px solid')
      case 2 : return ('#84fab0 3px solid')
      case 3 : return ('#9795f0 3px solid')
    }
  }} ;
  background: none;
  font-size: medium;
  padding: 10px;
  color: white;
  &:focus{
    outline: none;
  }
`
const UpdateBtn = styled.button`
  height: 100%;
  width: 100px;
  background-image: ${({index}:{index : number})=> {
    switch (index % 4){
      case 0 : return Style.near_moon
      case 1 : return Style.true_sunset
      case 2 : return Style.tempting_azure
      case 3 : return Style.teen_notebook
    }
  }} ;
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

interface props {
    todoItem : todoItem,
    setModifyMode : (mode: boolean) => void,
}

const ModifyItem = ({todoItem, setModifyMode} : props) => {

    const dispatch = useAppDispatch();
    const reduxTodoList = useSelector((state: RootState) => state.todo.todo)

    const [updateText, setUpdateText] = useState(todoItem.title)

    const onClickUpdate = () => {
        const newItem : todoItem = {id: todoItem.id, title: updateText, date: todoItem.date, isCompleted: todoItem.isCompleted}
        dispatch(modifyTodo({todo : newItem}))
        setModifyMode(false)
    }
    return(
        <InputWrapper>
            <UpdateInput value={updateText} onChange={(event)=> setUpdateText(event.target.value)} index={reduxTodoList.findIndex((i)=> i === todoItem)}/>
            <UpdateBtn onClick={()=>onClickUpdate()} index={reduxTodoList.findIndex((i)=> i === todoItem)}>
                update
            </UpdateBtn>
        </InputWrapper>
    )
}
export default ModifyItem
