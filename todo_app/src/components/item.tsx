import React, {useState} from "react";
import {Style, todoItem} from '../App'
import styled from "styled-components";
import {toast} from "react-toastify";
import {useAppDispatch} from "../index";
import {changeStatus, modifyTodo} from "../store/todos/actions";
import Modal from "./Modal/modal";
import ModalContainer from "./Modal/ModalContainer";

const TodoItemWrapper = styled.div`
  display: grid;
  width: 500px;
  height: auto;
  grid-template-columns: 1fr 7fr 1fr 1fr;
  border: none;
  margin: 0 auto;
  margin-bottom: 10px;
 
  background-image: ${({index}:{index : number})=> {
    switch (index % 4){
        case 0 : return Style.near_moon
        case 1 : return Style.true_sunset
        case 2 : return Style.tempting_azure
        case 3 : return Style.teen_notebook
    }
}} ;
  border-radius: 5px;
`
const FinishBtn = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  border: white 1.5px solid;
  border-radius: 50%;
  background-image: ${({isCompleted} : {isCompleted : boolean}) => isCompleted?
    `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='purple' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e")`:
    `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e")`
};
  background-size: 100% 100%;
  margin: auto;
  width: 23px;
  height: 23px;
  cursor: pointer;
  border : ${({isCompleted} : {isCompleted : boolean}) => isCompleted? 'purple 1.5px solid' :'white 1.5px solid'}
`
const Box = styled.div`
  width: 10px;
  height: 23px;
`
const Text = styled.label`
  text-align: start;
  padding: 15px 0;
  overflow-wrap: break-word;
  color: white;
`
const DeleteBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`
const ModifyBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`
const StoreBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`
const TodoItem = styled.div`
  background: none;
  border: none;
  outline: none;
  text-align: start;
  font-size: 17px;
  padding: 10px 0;
  overflow-wrap: break-word;
  color: white;
  text-decoration: ${({isCompleted}:{isCompleted : boolean})=>(isCompleted? 'line-through':'')};
`
const TodoInput = styled.input`
  width: 100%;
  height: 20px;
  background: none;
  border: none;
  outline: none;
  text-align: start;
  font-size: 17px;
  padding: 10px 0;
  overflow-wrap: break-word;
  color: white;
`

interface Props {
    todoItem: todoItem,
    index: number,
}
function Item({ todoItem, index } : Props) {
    const trash = require('../icons/trash.png')
    const modify = require('../icons/pencil.png')
    const store = require('../icons/-.png')
    const dispatch = useAppDispatch();

    const [deleteItem, setDeleteItem] = useState(-1)
    const [modalVisible, setModalVisible] = useState(false)
    const [modifyItem, setModifyItem] = useState<todoItem>({id :-1, title : '', date : '', isCompleted: false})
    const { id, title, date, isCompleted } = todoItem

    const [updateText, setUpdateText] = useState(title)

    const changeItem = React.useCallback(
        (id: number)=> dispatch(changeStatus({id})),[dispatch]
    )

    const notify = React.useCallback((isCompleted : boolean) => {
        isCompleted? toast("still",{
            autoClose: 2000,
        }) : toast("Finished",{
            autoClose: 2000,
        })
    },[])

    const onFinishClick = React.useCallback((val: todoItem) => {
        changeItem(val.id)
        notify(val.isCompleted)
    },[changeItem, notify])

    const onDeleteClick = React.useCallback((id: number) => {
        setDeleteItem(id)
        setModalVisible(true)
    },[])

    const onModifyClick = React.useCallback((val: todoItem) => {
        setModifyItem(val)
    },[setModifyItem])

    const onUpdateClick = React.useCallback(() => {
        const newItem : todoItem = {id: id, title: updateText, date: date, isCompleted: isCompleted}
        dispatch(modifyTodo({todo : newItem}))
    },[dispatch, date, id, isCompleted, updateText])

    return(
        <>
            <TodoItemWrapper index={index}>
                {(todoItem !== modifyItem)? <FinishBtn onClick={()=> onFinishClick(todoItem)} isCompleted={isCompleted}/> : <Box/> }
                <Text>
                    {(todoItem !== modifyItem)?
                        <TodoItem isCompleted={isCompleted}>
                            {title}
                        </TodoItem>
                        :
                        <TodoInput autoFocus={true} value={updateText} onChange={(event)=> setUpdateText(event.target.value)}/>
                    }
                </Text>
                <DeleteBtn onClick={()=> onDeleteClick(id)}>
                    <img src={trash} alt='delete' style={{width: '20px'}}/>
                </DeleteBtn>
                {(todoItem !== modifyItem)?
                    <ModifyBtn onClick={()=> onModifyClick(todoItem)}>
                        <img src={modify} alt='modify' style={{width: '19px'}}/>
                    </ModifyBtn>
                    :
                    <StoreBtn onClick={onUpdateClick}>
                        <img src={store} alt='modify' style={{width: '20px'}}/>
                    </StoreBtn>
                }
            </TodoItemWrapper>
            <ModalContainer>
                {modalVisible && <Modal id={deleteItem} setModalVisible={setModalVisible}/>}
            </ModalContainer>
        </>
    )
}
export default Item;
