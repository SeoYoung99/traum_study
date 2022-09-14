import React, { useEffect } from 'react';
import { useState } from 'react';
import Input from './components/input';
import './App.css';
import Item from './components/item';

export type todoItem = {
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

  useEffect(()=>{
    console.log(todoList)  
  },[todoList])

  //<TodoList>컴포넌트를 만들고 리스트를 통째로 전달해줬을 때는 계속 타입 오류..!!왜..일까요...
  //is not assignable to type 'intrinsicattributes

  return (
    <div className="App">
      <Input addItem = {addItem}/>
      
      {todoList.map(
        (item, index) => 
          <Item 
            key={index} 
            title={item.title} 
            date={item.date} 
            status={item.status} 
          />
        )
      }
    </div>
  );
}

export default App;
