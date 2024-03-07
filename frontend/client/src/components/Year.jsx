import React from 'react'

function Year({data}) {
  return (
    <div>       
        
         {data && data.map((item) => (
        <div key={item._id}>
          <h2 id='year'>Year:{item.Year}</h2>
          <p>Song:{item.song}</p>
          <p>Artist:{item.artist}</p>
          <hr/>
        </div>
      ))}</div>
  )
}

export default Year