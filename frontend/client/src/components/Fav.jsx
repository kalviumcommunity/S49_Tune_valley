import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Fav.css';
import axios from 'axios';


function Fav() {
  const [favs , setFavs] = useState([])
  
  useEffect(() =>{
     axios.get('http://localhost:8000/fav')
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
    <div   className='container' >
      <div>
        <Link to="/create" className='add'>Add +</Link>
        <table className='table' >
          <thead>
            <tr>
              <th id='artist'  >Artist</th>
              <th id='song' >song</th>
              <th id='album' >Album</th> 
              <th>Update/Delete</th>
              
            </tr>
          </thead>
          <tbody>
            {
              favs.map((fav) =>{
                return <tr>
                  <td>{fav.Artist}</td>
              
                  <td>{fav.Song}</td>
                
                  <td>{fav.Album}</td>
                  
                  <td><Link to={`/update/${fav._id}`} className='btn btn-success' >update</Link>
                  <button   className='delete' onClick={(e) => handleDelete(fav._id)} ><b>Delete</b></button>
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