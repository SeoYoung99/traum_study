import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { postItem, useAppSelector } from "../../src/store/types/types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Button from "@mui/material/Button";
import {
  deletePost,
  updateID,
  updatePost,
} from "../../src/store/actions/actions";
import { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";
import { Container } from "@mui/material";
import styled from "styled-components";
import {
  CustomBtn,
  TitleBox,
} from "../../src/components/styleComponent/components";

const PostPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const postList: postItem[] = useAppSelector(
    (state) => state.postReducer.postList
  );
  //새로운 입력을 받을 때마다 렌더링이 이루어지는데, 현재 포스트와 관련된 id는 변하지 않으므로 관련 변수들에 useMemo를 사용
  const queryId = useMemo(
    () => parseInt(router.query.id as string),
    [router.query.id]
  );
  const updatingPost = useMemo(
    () => postList.filter((post) => post.id === queryId),
    [postList, queryId]
  );
  const index = useMemo(
    () => postList.findIndex((post) => post === updatingPost[0]),
    [postList, updatingPost]
  );

  const [newTitle, setNewTitle] = useState(postList[index].title);
  const [newContext, setNewContext] = useState(postList[index].context);
  const [modifyMode, setModifyMode] = useState(false);

  const updatePostBtnClicked = () => {
    //post만들어서 디스패치
    let Post: postItem = {
      id: queryId,
      title: newTitle,
      context: newContext,
      date: postList[index].date,
    };
    dispatch(updatePost({ index: index, newPost: Post }));
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 10 }}>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <TitleBox>
          {modifyMode ? (
            <TextField
              sx={{ width: 1000 }}
              variant="standard"
              value={newTitle}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
          ) : (
            <TextField
              sx={{ width: 1000 }}
              variant="standard"
              value={postList[index].title}
            />
          )}
          <CustomBtn
            style={{ marginLeft: "18px" }}
            onClick={(e) => {
              setModifyMode(true);
            }}
          >
            수정
          </CustomBtn>
          <Link href="/mainPage">
            <CustomBtn onClick={(e) => dispatch(deletePost({ index: index }))}>
              삭제
            </CustomBtn>
          </Link>
        </TitleBox>
        {/*{modifyMode ? (*/}
        {/*  <TextField*/}
        {/*    multiline*/}
        {/*    rows={30}*/}
        {/*    value={newContext}*/}
        {/*    onChange={(e) => {*/}
        {/*      setNewContext(e.target.value);*/}
        {/*    }}*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  <TextField multiline rows={30} value={postList[index].context} />*/}
        {/*)}*/}
        <TextField
          multiline
          rows={30}
          value={newContext}
          onChange={(e) => {
            setNewContext(e.target.value);
          }}
          disabled={!modifyMode}
        />
      </Box>
      <Link href="../mainPage">
        <CustomBtn
          style={{ marginLeft: "1096px" }}
          onClick={(e) => {
            updatePostBtnClicked();
          }}
        >
          등록
        </CustomBtn>
      </Link>
    </Container>
  );
};
export default PostPage;
