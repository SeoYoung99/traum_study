import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {toast} from "react-toastify";
import {useAppDispatch} from "../index";
import {changeStatusThunk, modifyTodo} from "../store/todos/actions";
import todo, { todoItem } from "../store/todos/reducer";
import {addDeleteModal} from "../store/modal/modalaction";
import update = toast.update;

enum Style {
    NEAR_MOON = 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    TRUE_SUNSET = 'linear-gradient(90deg, #fa709a 0%, #fee140 100%)',
    TEMPTING_AZURE = 'linear-gradient(90deg, #84fab0 0%, #8fd3f4 100%);',
    TEEN_NOTEBOOK = 'linear-gradient(90deg, #9795f0 0%, #fbc8d4 100%)',
}
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
        case 0 : return Style.NEAR_MOON
        case 1 : return Style.TRUE_SUNSET
        case 2 : return Style.TEMPTING_AZURE
        case 3 : return Style.TEEN_NOTEBOOK
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
`
const Box = styled.div`
  width: 10px;
  height: 23px;
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
const StoreBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`
const TodoItem = styled.div`
  background: none;
  border: none;
  outline: none;
  text-align: start;
  font-size: 17px;
  padding: 10px 0;
  overflow-wrap: break-word;
  color: white;
  text-decoration: ${({isCompleted}:{isCompleted : boolean})=>(isCompleted? 'line-through':'')};
`
const TodoInput = styled.input`
  width: 100%;
  height: 20px;
  background: none;
  border: none;
  outline: none;
  text-align: start;
  font-size: 17px;
  padding: 10px 0;
  overflow-wrap: break-word;
  color: white;
`
interface Props {
    todoItem: todoItem,
    index: number,
}
//기억해 여기서 받아오는 건 단일 객체야 제발....
const Item = ({ todoItem, index } : Props) => {
    const trash = require('../icons/trash.png')
    const modify = require('../icons/pencil.png')
    const store = require('../icons/-.png')

    const dispatch = useAppDispatch();

    const [modifyMode, setModifyMode] = useState(false)
    const [updateText, setUpdateText] = useState(todoItem.title)
    useEffect(()=>{  //useState 때문에 계속 업데이트해줘야함
        setUpdateText(todoItem.title)
    },[todoItem])

    //ref객체 만들고
    const ref = useRef<HTMLDivElement>(null)

    const onFinishClick = React.useCallback(() => {
        dispatch(changeStatusThunk(todoItem))
        //toast message
        todoItem.isCompleted? toast("still",{
            autoClose: 2000,
        }) : toast("Finished",{
            autoClose: 2000,
        })
    },[dispatch, todoItem])

    const onModifyClick = React.useCallback(() => {
        setModifyMode(true)
    },[])

    const onUpdateClick = React.useCallback(() => {
        setModifyMode(false)
        const newItem : todoItem = {id: todoItem.id, title: updateText, date: todoItem.date, isCompleted: todoItem.isCompleted}
        dispatch(modifyTodo({todo : newItem}))
    },[dispatch, todoItem.date, todoItem.id, todoItem.isCompleted, updateText])

    const onDeleteClick = React.useCallback(() => {
        dispatch(addDeleteModal(
            {
                key: "delete",
                id: todoItem.id,
                props:{ text: '삭제하시겠습니까?'
                }}))
    },[dispatch, todoItem.id])

    useEffect(() => {
        const handleClickOutside = (e:MouseEvent) => {
            //선택된 DOM요소가 있고, 해당 ref 가 이벤트 DOM을 포함하지 않으면
            if(ref.current && !ref.current.contains(e.target as Node)){
                //해당 아이템 수정 취소
                setModifyMode(false)
            }
        }
        //모든 마우스 down 에 핸들러함수 할당
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            //뒷처리 함수로 이벤트 리스너 지워주기
            document.removeEventListener('mousedown', handleClickOutside)
            }
        }, [ref])

    return(
        <>  {/*만든 ref객체를 선택하고 싶은 DOM에 ref 값으로 설정*/}
            <TodoItemWrapper index={index} ref={ref}>
                {modifyMode? <Box/> : <FinishBtn onClick={onFinishClick} isCompleted={todoItem.isCompleted}/>}
                <Text>
                    {modifyMode?
                        <TodoInput value={updateText} onChange={(event)=> setUpdateText(event.target.value)} autoFocus={true}/>
                        :
                        <TodoItem isCompleted={todoItem.isCompleted}>
                            {todoItem.title}
                        </TodoItem>
                    }
                </Text>
                {modifyMode?
                    <StoreBtn onClick={onUpdateClick}>
                        <img src={store} alt='modify' style={{width: '20px'}}/>
                    </StoreBtn>
                    :
                    <ModifyBtn onClick={onModifyClick}>
                        <img src={modify} alt='modify' style={{width: '19px'}}/>
                    </ModifyBtn>
                }
                <DeleteBtn onClick={onDeleteClick}>
                    <img src={trash} alt='delete' style={{width: '20px'}}/>
                </DeleteBtn>
            </TodoItemWrapper>
        </>
    )
}
export default Item;
