import React from 'react';
import Input from './components/input';
import './App.css';
import Item from './components/item';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
import { RootState } from './store';
import styled from "styled-components";

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
function App() : React.ReactElement {

  const todoList = useSelector((state: RootState) => state.todo.todo)

  return (
    <Wrapper>
      <Title> Todo </Title>
      <ToastContainer />
      <Input />
        {todoList.map((val: todoItem, index)=>
            <Item key={val.id} todoItem={val} index={index}/>
        )}
    </Wrapper>
  );
}

export default App;
