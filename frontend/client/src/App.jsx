import React from 'react'
import './App.css'
import Home from './components/Home.jsx'
import Data from './components/Data.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  let [data, setData] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:8000/getTunevalley')
         .then(res => setData(res.data))
         .catch((err)=> console.error(err))
  },[])
  return (
    <>
      <Home/>
      {/* <Data/> */}
      <div>{data && data.map((item)=>{
        return(
          <div key={item._id}>
            <h2 id='year'>Year:{item.Year}</h2> <hr />
            <div>{item.Songs && item.Songs.map((itt)=>{
              return(
                <div key={itt._id}>
                  <p>Song: {itt.Song}</p>
                  <p>Artist: {itt.Artist}</p>
                </div>
              )
            })}</div>
          </div>
        )
      })}</div>
    </>
  )
}

export default App
