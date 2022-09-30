import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {postItem, useAppSelector} from "../../src/store/types/types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Button from "@mui/material/Button";
import {deletePost, updateID, updatePost} from "../../src/store/actions/actions";
import {GetServerSideProps} from "next";
import {useDispatch} from "react-redux";

const PostPage = () => {

    const dispatch = useDispatch()
    //query를 받아오기 위해 사용
    const router = useRouter();
    //스토어에서 가져온 전체 포스트리스트
    let postList : postItem[] = useAppSelector(state => state.postReducer.postList)
    //쿼리로 넘겨준 값 받아옴 (+타입 단언)
    const queryId = parseInt(router.query.id as string)
    console.log(queryId)

    //id에 해당하는 포스트와 인덱스 -> 삭제 버튼을 누르면 없어짐..!!!
    let updatingPost = postList.filter((post) => post.id === queryId)
    let index = postList.findIndex((post)=> post === updatingPost[0])

    console.log(updatingPost) //[]
    console.log(index) //-1
    console.log(updatingPost[0])//undefined

    //수정버튼 누르면 수정모드
    let[modifyMode, setModifyMode] = useState(false)

    //디폴트 값 설정 > 없어져도 오류나지 않도록
    let post = updatingPost[0]? updatingPost[0] : { id: queryId, title: '', context: '', date: ''}
    let title = updatingPost[0]? updatingPost[0].title : ''
    let context = updatingPost[0]? updatingPost[0].context : ''

    //수정한 값으로 세팅
    let[newPost, setNewPost] = useState(post)
    let[newTitle, setNewTitle] = useState(title)
    let[newContext, setNewContext] = useState(context)

    useEffect(()=>{
        //날짜와 id는 유지
        let Post : postItem = {id: queryId, title: newTitle, context: newContext, date: newPost.date }
        setNewPost(Post)
    },[newTitle, newContext])

    console.log(newPost)
    //이제 게시물을 보여주고 (스토어에서 가져와서 각 input의 text로 뿌려야힘)
    //등록 버튼 누르면 updatePost
        return(
            <div>
                <section>
                    지금은 읽기 & 수정 페이지 만드는즁
                    {queryId}
                </section>
                <Button variant="outlined" size={"small"} onClick={(e)=>{setModifyMode(true)}} >수정</Button>
                <Link href='/mainPage'>
                    <Button variant="outlined" size={"small"} onClick={(e)=> dispatch(deletePost({index: index})) }>삭제</Button>
                </Link>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '80%' },}}
                    noValidate
                    autoComplete="off"
                >{modifyMode? <TextField
                    variant="standard"
                    value = {newTitle}
                    onChange={(e)=>{setNewTitle(e.target.value)}}
                />: <TextField
                    variant="standard"
                    value = {title}/>}
                    {modifyMode? <TextField
                        multiline
                        rows={30}
                        value = {newContext}
                        onChange={(e)=>{setNewContext(e.target.value)}}
                    />: <TextField
                        multiline
                        rows={30}
                        value = {context}/>}
                </Box>
                <Link href='../mainPage'>
                    <Button variant="outlined" onClick={(e)=> { dispatch(updatePost({index: index, newPost: newPost}))}}>등록</Button>
                </Link>
            </div>
        )
     }
export default PostPage


