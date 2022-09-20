import { useRecoilState } from "recoil";
import { todoListState } from "./TodoList";
import { todoItemType } from './TodoList';

function TodoItem(props: {item : todoItemType}) {
    const item = props.item

    //useState와 비슷하지만 atom이라 여러 컴포넌트에서 사용할 수 있다는 점이 다르다
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const index = todoList.findIndex((listItem) => listItem === item);
  
    const editItemText = (e: React.ChangeEvent<HTMLInputElement>) => {
        //인덱스를 찾아서 고친 새 리스트를 통째로 다시 atom에 set
      const newList = replaceItemAtIndex(todoList, index, {
        ...item,
        text: e.target.value,
      });
      setTodoList(newList);
    };
  
    const toggleItemCompletion = () => {
      const newList = replaceItemAtIndex(todoList, index, {
        ...item,
        isComplete: !item.isComplete,
      });
      setTodoList(newList);
    };
  
    const deleteItem = () => {
      const newList = removeItemAtIndex(todoList, index);
      setTodoList(newList);
    };
  
    return (
      <div>
        <input type="text" value={item.text} onChange={editItemText} />
        <input
          type="checkbox"
          checked={item.isComplete}
          onChange={toggleItemCompletion}
        />
        <button onClick={deleteItem}>X</button>
      </div>
    );
  }
  
  function replaceItemAtIndex(arr: todoItemType[], index: number, newValue: todoItemType) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  
  function removeItemAtIndex(arr: todoItemType[], index: number) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }
  export default TodoItem

