import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPost, updateID } from "../../src/store/actions/actions";
import {postItem, useAppSelector} from "../../src/store/types/types";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PostItem from "./postItem";
import Link from "next/link";
import {useRouter} from "next/router";


const WritePost = () =>{

    //전역에서 관리하는 게시글 등록 id
    let writeID : number = useAppSelector(state => state.postReducer.writeID)

    let today = new Date();
    let TodayDate = today.toLocaleDateString();
    let date = TodayDate;

    //새로운 게시물 등록
    const dispatch = useDispatch()
    const updatePost = useCallback(
        (post: postItem) => dispatch(addPost({post : post}))
        ,[dispatch])

    //postItem : id, title, context, date
    const[id, setId] = useState(writeID)
    const[title, setTitle] = useState('')
    const[context, setContext] = useState('')
    const[post, setPost] = useState<postItem>({id : 0, title: title, context: context, date: date})

    useEffect(()=>{
        let item : postItem = {id: writeID , title: title, context: context, date: date}
        setPost(item)
    },[id, title, context, date])

    return(
        <div>
            <section>
                지금은 작성 페이지 만드는즁
            </section>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '80%' },}}
                noValidate
                autoComplete="off"
            >
                <TextField id="title" label="제목을 입력하세요" variant="standard" onChange={(e)=> {setTitle(e.target.value)}}/>
                <TextField
                    multiline
                    rows={30}
                    onChange={(e)=> {setContext(e.target.value)}}
                />
            </Box>
            <Link href='../mainPage'>
            <Button variant="outlined" onClick={(e)=> {updatePost(post); dispatch(updateID({}))}}>등록</Button>
            </Link>
        </div>
    )
}
export default WritePost
