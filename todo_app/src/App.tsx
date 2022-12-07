import React, {useEffect, useState} from 'react';
import Input from './input';
import './App.css';
import Item from './item';
import trash from './icons/trash.png';
import modify from './icons/pencil.png'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//useSelector()
//-> 리덕스 스토어에 저장된 데이터를 추출하는 Hook입니다. 

//useDispatch()
//-> 리덕스 스토어에 설정된 action에 대한 dispatch를 연결하는 Hook입니다.
import { useSelector } from 'react-redux';
import { RootState } from './modules';
import {changeStatus, deleteTodoThunk} from './modules/todos/actions';
import { useAppDispatch } from '.';
import styled from "styled-components";
import ModalContainer from "./modules/Modal/ModalContainer";

export type todoItem = {
  id : number;
  title : string ;
  date : number | string ;
  isCompleted: boolean ;
}

const Wrapper = styled.div`
  background-color: #222021;
`
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: white;
  margin: 0;
  padding: 30px;
`
const TodoItemWrapper = styled.div`
  display: grid;
  width: 500px;
  height: auto;
  grid-template-columns: 1fr 7fr 1fr 1fr;
  border: none;
  margin: 0 auto;
  margin-bottom: 10px;
  background-image: linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%);
  border-radius: 5px;
`
const FinishBtn = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  border: white 1.5px solid;
  border-radius: 50%;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  margin: auto;
  width: 23px;
  height: 23px;
  cursor: pointer;
  
  &:checked{
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='purple' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    border: purple 1.5px solid
  }
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
function App() : React.ReactElement {

  const [isVisible, setIsVisible] = useState(false)
  const [deleteItem, setDeleteItem] = useState(-1)
  //useSelector로 store(state타입이 RootState인) 접근
  const reduxTodoList = useSelector((state: RootState) => state.todo.todo)
  const dispatch = useAppDispatch();

  const changeItem = React.useCallback(
      (id: number)=> dispatch(changeStatus({id})),[dispatch]
  )
  const onclickFinish = (val: todoItem) => {
    changeItem(val.id)
    notify(val.isCompleted)
  }
  const onClickDelete = (id: number) => {
    setIsVisible(true)
    setDeleteItem(id)
  }
  const notify = (isCompleted : boolean) => {
    isCompleted? toast("still",{
      autoClose: 2000,
    }) : toast("Finished",{
      autoClose: 2000,
    })
  }
  return (
    <Wrapper>
      <Title> Todo </Title>
      <ToastContainer />
      <Input/>
      {reduxTodoList.map((val: todoItem)=>
        <TodoItemWrapper key={val.id}>
          <FinishBtn onClick={()=> onclickFinish(val)}/>
          <Text>
            <Item
                id={val.id}
                title = {val.title}
                date = {val.date}
                isCompleted = {val.isCompleted}
            />
          </Text>
          <DeleteBtn onClick={()=> onClickDelete(val.id)}>
            <img src={trash} alt='delete' style={{width: '20px'}}/>
          </DeleteBtn>
          <ModifyBtn>
            <img src={modify} alt='modify' style={{width: '19px'}}/>
          </ModifyBtn>
        </TodoItemWrapper>
        )}
      {isVisible && <ModalContainer setIsVisible={setIsVisible} id={deleteItem}/>}
    </Wrapper>
  );
}

export default App;
