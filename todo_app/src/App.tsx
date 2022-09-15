import React, { useEffect } from 'react';
import { useState } from 'react';
import Input from './components/input';
import './App.css';
import Item from './components/item';

export type todoItem = {
  key : number;
  title : string ;
  date : number | string ;
  status: boolean ;
}

function App() : React.ReactElement {

  const [todoList, setTodoList] = useState<todoItem[]>([]); 

  function addItem( item : todoItem ){ //item 추가 함수
    let newList = todoList.concat(item)
    setTodoList(newList)
  }

  function changeList(key: number){
    let newList = todoList.filter(item => item.key !== key)
    setTodoList(newList)
  }

  useEffect(()=>{
    console.log(todoList)  
  },[todoList])

  return (
    <div className="App">
      <Input addItem = {addItem}/>
      {todoList.map((val)=>
      <div style={{display: 'flex'}}>
        <Item 
          key={val.key}
          title = {val.title}
          date = {val.date}
          status = {val.status}
        />
        <button onClick={()=>changeList(val.key)}>삭제</button>
      </div>
      )}
    </div>
  );
}

export default App;
