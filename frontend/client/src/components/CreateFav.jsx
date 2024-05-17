import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createFav.css';

function CreateFav() {
    const [Artist, setArtist] = useState('')
    const [Song, setSong] = useState('')
    const [Album, setAlbum] = useState('')
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    
    useEffect(() =>{
        setUsername(localStorage.getItem('localuser')) 
      },[])


    
    const Submit = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/createFav",{Artist,Song,Album,username})
        .then(result => {
          console.log(result)
          navigate('/fav')
        })
        .catch(err => console.log(err.response)) 
    }

  return (
    <div className="container">
        <div className="form-container">
            <form className="form" onSubmit={Submit}>
                <h2 className="header">Add Favorites</h2>
                <div className="input-container">
                    <label className="label">Artist</label> 
                    <input type="text" className="input" onChange={(e) => setArtist(e.target.value)} />
                </div>
                <div className="input-container">
                    <label className="label">Song</label>
                    <input type="text" className="input" onChange={(e) => setSong(e.target.value)} />
                </div>
                <div className="input-container">
                    <label className="label">Album</label>
                    <input type="text" className="input" onChange={(e) => setAlbum(e.target.value)} />
                </div>
                <button className="button">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateFav;
