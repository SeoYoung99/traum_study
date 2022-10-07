import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updateID } from "../../src/store/actions/actions";
import { postItem, useAppSelector } from "../../src/store/types/types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Container } from "@mui/material";

const WritePost = () => {
  //전역에서 관리하는 게시글 등록 id
  let writeID: number = useAppSelector((state) => state.postReducer.writeID);

  let today = new Date();
  const date = today.toLocaleDateString();

  //새로운 게시물 등록
  const dispatch = useDispatch();
  //postItem : id, title, context, date
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");

  const onSubmitBtnClicked = () => {
    let item: postItem = {
      id: writeID,
      title: title,
      context: context,
      date: date,
    };
    dispatch(addPost({ post: item }));
    dispatch(updateID({}));
  };
  return (
    <Container maxWidth="lg" sx={{ pt: 10 }}>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="title"
          label="제목을 입력하세요"
          variant="standard"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          multiline
          rows={30}
          onChange={(e) => {
            setContext(e.target.value);
          }}
        />
      </Box>
      <Link href="../mainPage">
        <Button
          style={{ marginLeft: "1096px" }}
          variant="outlined"
          onClick={(e) => {
            onSubmitBtnClicked();
          }}
        >
          등록
        </Button>
      </Link>
    </Container>
  );
};
export default WritePost;
