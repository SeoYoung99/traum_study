import type { NextPage } from 'next'
import axios from 'axios'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

// export const Column = styled('button')<{ ratio?: number; isActive?: boolean; textAlign?: string; color?: string }>`
//   position: relative;
//   display: flex;
//   align-items: center;
//   box-sizing: border-box;
//   flex: ${({ ratio }) => ratio || 1};
//   padding: 0;
//   color: ${({ color }) => color || LIGHT_NAVY_2};
//   font-size: 11px;
//   font-weight: 500;
//   line-height: 13px;
//   white-space: pre-wrap;
//   text-align: ${({ textAlign }) => textAlign || 'left'};
//   &.Up {
//     span:first-of-type {
//       animation: ${changeColor(GREEN_1)} 3s 1;
//     }
//   }
//   &.Down {
//     span:first-of-type {
//       animation: ${changeColor(RED_1)} 3s 1;
//     }
//   }
//   & .title {
//     font-weight: bold;
//     font-size: 12px;
//     line-height: 14px;
//     color: ${LIGHT_NAVY_4};
//   }
//   & .sub-title {
//     font-weight: 500;
//     font-size: 8px;
//     line-height: 9px;
//     letter-spacing: -0.05em;
//     color: ${LIGHT_NAVY_4};
//   }
// `;
const Table = styled.table`
  border: solid 1px;
  border-collapse: collapse;
`
const Trow = styled.tr`
  border: 2px solid;
`
const Th = styled.th`
  border: solid 1px;
  padding: 5px;
  text-align: center;
`
const Td = styled.td`
  border: solid 1px;
  padding: 5px;
  text-align: center;
`
const Favorite = styled.button`
  margin-right: 5px;
  color: ${({color})=> color};
`
const FavTab = styled.button`
  margin-left: 20px;
`
interface Data {
  symbol: string;
  price: string;
  priceChangePercent: string;
  volume: string;
  lastPrice: string;
}
var tmp :string[] = []
const Home: NextPage = () => {
  
  const[datalist, setDatalist] = useState<Data[]>([])
  const [clickedData, setClickedData] = useState<string[]>([])
  const [favClick, setFavClick] = useState(false)
  
  function handleClick(symbol: string){
    setClickedData((prev)=>{
      const newClickedData = [...prev]
      if(newClickedData.includes(symbol)){
        let filteredList = newClickedData.filter((item)=>item !== symbol)
        return filteredList
      }
      else{
        newClickedData.push(symbol)
        return newClickedData
      }
    })
  }

  useEffect(()=>{
    axios.get('https://api.binance.com/api/v3/ticker/24hr')
      .then(function(response){
        setDatalist(response.data.slice(0,100))
      })
  },[])

  useEffect(()=>{
    console.log(clickedData)
  },[clickedData])

  let results = datalist.map((data,index) => { //{},0
    return(
      <Trow key={index} >
        <Td><Favorite onClick={()=>{handleClick(data.symbol)}} color={clickedData.includes(data.symbol)? 'red':'black'}>favorite</Favorite>
        {datalist[index].symbol}</Td>
        <Td>{data.lastPrice}</Td>
        <Td>{data.priceChangePercent}</Td>
        <Td>{data.volume}</Td>
      </Trow>
    )
  })
  
  let favorites = datalist.map((data,index)=> {
      //data중에 즐겨찾기한 종목이 있으면
      return(
        <>
        {clickedData.includes(data.symbol) && 
        <Trow key={index}>
          <Td>{data.symbol}</Td>
          <Td>{data.lastPrice}</Td>
          <Td>{data.priceChangePercent}</Td>
          <Td>{data.volume}</Td>
        </Trow>}
        </>
        )
      }
    )
      
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
        <Table>
        <thead>
            <tr>
              <Th>Coin Name</Th>
              <Th>Price</Th>
              <Th>Rate</Th>
              <Th>Volume</Th>
            </tr>
          </thead>
          <tbody>
            {results}
          </tbody> 
        </Table>
      <FavTab onClick={()=>{
        setFavClick(!favClick)}}>Favorite Coins</FavTab>
      {favClick &&
      <Table>
        <thead>
          <tr>
          <Th>Coin Name</Th>
          <Th>Price</Th>
          <Th>Rate</Th>
          <Th>Volume</Th>
            </tr>
          </thead>
          <tbody>
            {favorites}
          </tbody>
        </Table>}
        
    </div>
  )
}

export default Home