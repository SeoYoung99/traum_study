import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Categories } from '../src/components/categories'
import { Pagenation } from '../src/components/pagenation'
import { addPost } from '../src/store/actions/actions'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import MainPage from "./mainPage";
import { postItem } from '../src/store/types/types'

const Home: NextPage = () => {
  return (
    <div>
      <MainPage/>
    </div>
  )
}

export default Home
