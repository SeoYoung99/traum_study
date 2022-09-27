import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Categories } from '../src/components/categories'
import { PostItem } from '../src/components/postItem'
import { Pagenation } from '../src/components/pagenation'
import { addPost } from '../src/store/actions/actions'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'

export type postItem = {
  id: number,
  title: string,
  context: string,
  date: string
}

const Home: NextPage = () => {

  const dispatch = useDispatch()
  const updatePost = useCallback(
    (post: postItem) => dispatch(addPost({post : post})),
    [dispatch])

  const[text,setText] = useState('')
  const[post, setPost] = useState<postItem>({id : 12, title: text, context: text, date: '2022'})
  
  useEffect(()=>{
    let item : postItem = {id : 12, title: text, context: text, date: '2022'}
    setPost(item)
  },[text])

  return (
    <div>
      <section>
        Board
      </section>
      <input onChange={(e)=> {setText(e.target.value)}}/>
      <button onClick={(e)=> {updatePost(post)}}>등록</button>
      <Categories/>
      <PostItem/>
      <Pagenation/>
    </div>
  )
}

export default Home
