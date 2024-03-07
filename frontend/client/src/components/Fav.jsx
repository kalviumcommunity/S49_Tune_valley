import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Fav() {
  const [favs , setFavs] = useState([])
  
  useEffect(() =>{
     axios.get('http://localhost:8000/')
    .then(result => {
      setFavs(result.data)
      console.log(favs)
    }).catch(err => console.log(err))

  },[])

  const handleDelete =(id) => {
    axios.delete(`http://localhost:8000/deleteFav/${id}`)
      window.location="/fav"

  }

  return (
    <div style={{color:"black"}}>
      <div>
        <Link to="/create" className='btn btn-success' style={{color:"black"}}>Add +</Link>
        <table className='table' >
          <thead>
            <tr>
              <th>Artist</th>
              <th>song</th>
              <th>Album</th>
            </tr>
          </thead>
          <tbody>
            {
              favs.map((fav) =>{
                return <tr>
                  <td>{fav.Artist}</td>
              
                  <td>{fav.Song}</td>
                
                  <td>{fav.Album}</td>
                  
                  <td><Link to={`/update/${fav._id}`} className='btn btn-success' style={{color:"black"}} >update</Link>
                  <button   className='btn btn-danger' onClick={(e) => handleDelete(fav._id)} >Delete</button>
                  </td>
                </tr>

              })
            }
          </tbody>
        </table>
      </div>
      </div>
  )
}

export default Fav