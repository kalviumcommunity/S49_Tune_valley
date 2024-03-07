import React,{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateFav() {
    const [Artist, setArtist] = useState('')
    const [Song, setSong] = useState('')
    const [Album, setAlbum] = useState()
    const navigate = useNavigate()

    const Submit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/createFav",{Artist,Song,Album})
        .then(result => {console.log(result)
        navigate('/')
    })
        .catch(err => console.log(err))
    }
  return (
    <div>
        <div>
            <form onSubmit={Submit} >
                <h2>Add Favourites</h2>
                <div>
                    <label htmlFor="">Artist</label>
                    <input type="text" className='form-control' 
                    onChange={(e) => setArtist(e.target.value)} />
                </div>
                 <div className='' >
                    <label htmlFor="">Song</label>
                    <input type="text"className='form-control' 
                    onChange={(e) => setSong(e.target.value)}/>
        
                 </div>
                 <div className=''>
                    <label htmlFor="">Album</label>
                    <input type="text" className='form-control' 
                    onChange={(e) => setAlbum(e.target.value)} />
                 </div>
                 <button className='btn btn-success'>submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateFav