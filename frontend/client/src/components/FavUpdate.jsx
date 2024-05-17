import React , {useEffect,useState} from 'react';
import axios from 'axios';
import {useParams , useNavigate } from "react-router-dom";

function FavUpdate() {
    const {id} = useParams()
    const [Artist, setArtist] = useState('')
    const [Song, setSong] = useState('')
    const [Album, setAlbum] = useState()
    const navigate = useNavigate()
     
    useEffect(() =>{
        axios.get('http://localhost:8000/getFav/'+id)
        .then(result=> console.log(result))
     .catch(err => console.log(err))
   
     },[])

     const Update = (e) =>{
        e.preventDefault();
        axios.put("http://localhost:8000/updateFav/"+id,{Artist,Song,Album})
        .then(
          console.log(Artist, Song, Album),
            navigate('/fav')
          )
        .catch(err => alert(err.response.data.message))
    }




  return (
    <div className='w-50 bg-white rounded p-3'>
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Update} >
            <h2>Update User</h2>
            <div>
                <label htmlFor="">Artist</label>
                <input type="text" className='form-control'
                  value={Artist} onChange={(e) => setArtist(e.target.value)} />
            </div>
             <div className='' >
                <label htmlFor="">Song</label>
                <input type="text"className='form-control' 
                value={Song}  onChange={(e) => setSong(e.target.value)}/>
    
             </div>
             <div className=''>
                <label htmlFor="">Album</label>
                <input type="text" className='form-control' 
                value={Album}  onChange={(e) => setAlbum(e.target.value)} />
             </div>
             <button className='btn btn-success' onClick={Update}>Update</button>
        </form>
    </div>
</div>
  )
}

export default FavUpdate;