import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Categories } from './components/categories'
import { PostItem } from './components/postItem'
import { Pagenation } from './components/pagenation'

export type postItem = {
  id: number,
  title: string,
  context: string,
  date: string
}

const Home: NextPage = () => {
  return (
    <div>
      <section>
        Board
      </section>
      <Categories/>
      <PostItem/>
      <Pagenation/>
    </div>
  )
}

export default Home
