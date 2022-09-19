import React, { useEffect } from 'react';
import { useState } from 'react';
import Input from './input';
import './App.css';
import Item from './item';

//Redux의 Hook 

//useSelector()
//-> 리덕스 스토어에 저장된 데이터를 추출하는 Hook입니다. 

//useDispatch()
//-> 리덕스 스토어에 설정된 action에 대한 dispatch를 연결하는 Hook입니다.
import { useSelector } from 'react-redux';
import { RootState } from './modules';
import { useDispatch } from 'react-redux';
import { deleteTodo, deleteTodoThunk } from './modules/todos/actions';
import { useAppDispatch } from '.';

export type todoItem = {id : number;
  title : string ;
  date : number | string ;
  status: boolean ;
}

function App() : React.ReactElement {

  //const [todoList, setTodoList] = useState<todoItem[]>([]); 

  //useSelector로 store(state타입이 RootState인) 접근 
  const reduxTodoList = useSelector((state: RootState) => state.todo.todo)
  const dispatch = useAppDispatch();
  
  // function addItem( item : todoItem ){ //item 추가 함수
  //   let newList = todoList.concat(item)
  //   setTodoList(newList)
  // }

  // function changeList(key: number){
  //   let newList = todoList.filter(item => item.key !== key)
  //   setTodoList(newList)
  // }

  // useEffect(()=>{
  //   console.log(todoList)  
  // },[todoList])

  return (
    <div className="App">
      <Input/>
      {reduxTodoList.map((val: todoItem)=>
      <div style={{display: 'flex'}} key={val.id}>
        <Item 
          id={val.id}
          title = {val.title}
          date = {val.date}
          status = {val.status}
        />
        <button onClick={()=> {
         dispatch(deleteTodoThunk(val.id));
          }}>삭제</button>
      </div>
      )}
    </div>
  );
}

export default App;
