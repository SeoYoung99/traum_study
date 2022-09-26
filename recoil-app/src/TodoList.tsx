import React, { useEffect } from 'react';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
    RecoilValueReadOnly,
  } from 'recoil';
import TodoItemCreator from './TodoItemCreator';
import TodoItem from './TodoItem';
import TodoListFilters from './TodoListFilters';
import { filteredTodoListState } from './TodoListFilters';
import TodoListStatus from './TodoListStatus';

export type todoItemType =
    {
        id: number,
        text: string,
        isComplete: boolean,
    }
//todoItemType리스트를 가지는 atom = todoListState
export const todoListState = atom<todoItemType[]>({
    key: 'todoListState',
    default: [],
  });

function TodoList() {

  //atom 또는 selector값을 리턴, 컴포넌트가 상태를 읽을 수만 있게 하고 싶을 때 자주 사용
  //상태가 업데이트될 때 리렌더링하도록 컴포넌트를 구독
  const todoList= useRecoilValue(filteredTodoListState)
  const list = useRecoilValue(todoListState);

  useEffect(() => {
    console.log(list);
  }, []);
  
  return (
    <>
      <TodoListStatus />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}
export default TodoList;