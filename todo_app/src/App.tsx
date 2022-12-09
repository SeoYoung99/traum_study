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
import {changeStatus} from './modules/todos/actions';
import { useAppDispatch } from '.';
import styled from "styled-components";
import ModalContainer from "./modules/Modal/ModalContainer";
import ModifyItem from "./modules/modifyItem";

export enum Style {
  near_moon = 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  true_sunset = 'linear-gradient(90deg, #fa709a 0%, #fee140 100%)',
  tempting_azure = 'linear-gradient(90deg, #84fab0 0%, #8fd3f4 100%);',
  teen_notebook = 'linear-gradient(90deg, #9795f0 0%, #fbc8d4 100%)',
}
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
  //&:checked{
  //  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='purple' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  //  background-size: 100% 100%;
  //  border: purple 1.5px solid
  //}
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

  const [modalVisible, setModalVisible] = useState(false)
  const [deleteItem, setDeleteItem] = useState(-1)
  const [modifyMode, setModifyMode] = useState(false)
  const [modifyItem, setModifyItem] = useState<todoItem>({id :-1, title : '', date : '', isCompleted: false})
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
    // const result = window.confirm('delete?');
    setModalVisible(true)
    setDeleteItem(id)
  }
  const onClickModify = (val: todoItem) => {
    setModifyMode(true)
    setModifyItem(val)
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
      <Input mode={modifyMode}/>
      { modifyMode? <ModifyItem todoItem={modifyItem} setModifyMode={setModifyMode} />
          : <>
        {reduxTodoList.map((val: todoItem)=>
            <TodoItemWrapper key={val.id} index={reduxTodoList.findIndex((i)=> i === val)}>
              <FinishBtn onClick={()=> onclickFinish(val)} isCompleted={val.isCompleted}/>
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
              <ModifyBtn onClick={()=> onClickModify(val)}>
                <img src={modify} alt='modify' style={{width: '19px'}}/>
              </ModifyBtn>
            </TodoItemWrapper>
        )}
      </>}
      {modalVisible && <ModalContainer setModalVisible={setModalVisible} id={deleteItem}/>}
    </Wrapper>
  );
}

export default App;
