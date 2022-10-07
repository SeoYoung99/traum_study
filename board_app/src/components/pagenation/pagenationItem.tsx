import { postItem, useAppSelector } from "../../store/types/types";
import { Checkbox, ListItem } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { Divider, GridItem, Item } from "../styleComponent/components";
import Link from "next/link";
import Box from "@mui/material/Box";

interface ItemProps {
  isDeletePostsBtnClicked: boolean;
  currentItems: postItem[];
  removeList: number[];
  setRemoveList: Dispatch<SetStateAction<number[]>>;
}

const setSelectedCheckbox = (
  //기존의 리스트 필요
  checked: boolean,
  id: number,
  removeList: number[],
  setRemoveList: (list: number[]) => void
) => {
  let list = removeList;
  if (checked) {
    //체크박스 체크되면 > 지우려는 리스트에 있는지 확인하고 없으면 푸시
    if (!list.includes(id)) {
      list.push(id);
      setRemoveList(list);
    }
  } else {
    //체크박스 지워지면 > 지우려는 리스트에 있으면 삭제
    if (list.includes(id)) {
      let i = list.indexOf(id);
      list.splice(i, 1);
      setRemoveList(list);
    }
  }
};

export const Items = ({
  isDeletePostsBtnClicked,
  currentItems,
  removeList,
  setRemoveList,
}: ItemProps) => {
  const postList: postItem[] = useAppSelector(
    (state) => state.postReducer.postList
  );
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <ListItem key={item.id}>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                borderBottom: "solid 1px lightgray",
              }}
            >
              <Link
                href={{
                  pathname: "posts/postPage",
                  query: { id: item.id },
                }}
              >
                <GridItem>
                  <Item>{postList.indexOf(item)}</Item>
                  <Item>{item.title}</Item>
                  <Item>{item.date}</Item>
                </GridItem>
              </Link>
              {isDeletePostsBtnClicked ? (
                <Checkbox
                  onChange={(event) => {
                    setSelectedCheckbox(
                      event.target.checked,
                      item.id,
                      removeList,
                      setRemoveList
                    );
                  }}
                />
              ) : (
                <></>
              )}
            </Box>
          </ListItem>
        ))}
    </>
  );
};
