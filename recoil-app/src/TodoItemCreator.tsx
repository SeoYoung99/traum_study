import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "./TodoList";

let id = 0;
function getId():number {
  return id++;
}

function TodoItemCreator() {
    const [inputValue, setInputValue] = useState('');
    //상태를 변경하기 위해 비동기로 사용될 수 있는 setter 함수를 리턴합니다.
    //읽지 않고 쓰기만 하려고 할 때 추천, 컴포넌트가 값이 바뀔 때 구독하지 않고도 값을 설정
    const setTodoList = useSetRecoilState(todoListState);
    console.log(todoListState)
    const addItem = () => {
      setTodoList((oldTodoList) => [
        ...oldTodoList,
        {
          id: getId(),
          text: inputValue,
          isComplete: false,
        },
      ]);
      setInputValue('');
    };
  
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
  
    return (
      <div>
        <input type="text" value={inputValue} onChange={onChange} />
        <button onClick={addItem}>Add</button>
      </div>
    );
  }
  export default TodoItemCreator;
  // 고유한 Id 생성을 위한 유틸리티
  