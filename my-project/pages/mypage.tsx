import type { NextPage } from 'next'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Mypage: NextPage = () => {
    const[data, setDate] = useState(null)
    axios.get('https://api.binance.com/api/v3/ticker/24hr')
      .then(function(response){
        console.log(response.data)

      })
  // async function getData() {
  //   try {
  //     //응답 성공
  //     const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
  //     console.log(response);
  //   } catch (error) {
  //     //응답 실패
  //     console.error(error); a
  //   }
  // }
  return (
    <div>
      <div>data
      </div>
    </div>
  )
}

export default Mypage
