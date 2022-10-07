import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { postItem, useAppSelector } from "../../store/types/types";
import ReactPaginate from "react-paginate";
import styles from "../../../styles/pagination.module.css";
import { Items } from "./pagenationItem";
import { useDispatch } from "react-redux";

interface Props {
  itemsPerPage: number;
  isDeletePostsBtnClicked: boolean;
  removeList: number[];
  setRemoveList: Dispatch<SetStateAction<number[]>>;
}

export const PaginatedItems = ({
  itemsPerPage,
  isDeletePostsBtnClicked,
  removeList,
  setRemoveList,
}: Props) => {
  const postList: postItem[] = useAppSelector(
    (state) => state.postReducer.postList
  );
  const resultList: postItem[] = postList.slice().reverse();

  let defaultList: postItem[] = [];
  const [currentItems, setCurrentItems] = useState(defaultList);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const onPageChange = (selectedItem: { selected: number }) => {
    const newOffset =
      (selectedItem.selected * itemsPerPage) % resultList.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset: number = itemOffset + itemsPerPage;
    //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(resultList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(resultList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, removeList]);

  // Invoke when user click to request another page.
  console.log("pagenation", currentItems);
  return (
    <>
      <Items
        isDeletePostsBtnClicked={isDeletePostsBtnClicked}
        currentItems={currentItems}
        removeList={removeList}
        setRemoveList={setRemoveList}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        // onPageChange={(e) => {
        //   const newOffset = (e.selected * itemsPerPage) % resultList.length;
        //   setItemOffset(newOffset);
        // }}
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< prev"
        containerClassName={styles.pagination}
        pageClassName={styles.item}
      />
    </>
  );
};
//styled component 만들기
