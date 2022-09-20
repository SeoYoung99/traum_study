import React from "react";
import { atom, RecoilState, RecoilValueReadOnly, selector, useRecoilState } from "recoil";
import { todoListState } from "./TodoList";

//selector : 다른 데이터에 의존하는 동적인 데이터를 만들 수 있다!

//filterstate를 관리하는 atom을 만들고
const todoListFilterState : RecoilState<string> = atom<string>({
    key: 'todoListFilterState',
    default: 'Show All'
})
//필터에 따라 리턴값이 달라지는 selector를 만들자
export const filteredTodoListState = selector({
    key: 'filteredTodoListState',

    //get으로 atom 또는 selector의 값을 가져올 수 있다. 
    //Recoil의 어떤 상태에 의존해서 데이터를 변경할지 정할 때 get을 사용!!!
    get:({get}) => {
        //여기에서는 리스트의 값, 필터에 의존하므로 get으로 각각의 값을 가져온다
        const filter = get(todoListFilterState)
        const list = get(todoListState)

        switch(filter){
            case 'Show Completed':
                //get함수만 제공되면 RecoilValuReadOnly객체를 반환한다.
                return list.filter((item)=> item.isComplete)
            case 'Show Uncompleted':
                return list.filter((item)=> !item.isComplete)
            default:
                return list
        }
    }
})

function TodoListFilters(){
    //atom : filter state
    const [filter, setFilter] = useRecoilState(todoListFilterState)

    const updateFilter = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        setFilter(e.target.value)
    }

    return(
        <>
        Filter:
        {/* drop box select tag */}
        <select value={filter} onChange={updateFilter}>
            <option value='Show All'>All</option>
            <option value='Show Completed'>Completed</option>
            <option value='Show Uncompleted'>Uncompleted</option>
        </select>
        </>
    )
}
export default TodoListFilters