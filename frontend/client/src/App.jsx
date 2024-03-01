import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import UserProfile from './components/UserProfile';

function App() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/getTunevalley')
      .then(res => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
   let i = axios.post('http://localhost:8000/postUserData')
      console.log(i)
  }, []);

  const handleUserProfileClick = () => {
    setShowForm(true);
  };

  const closeModal = () => {
    setShowForm(false);
  };

  return (
    <>
      <nav className="navbar">
        <span className="navbar-brand">TUNE VALLEY 🎹</span>
        <a href="#" onClick={handleUserProfileClick}>User Profile</a>
      </nav>

      <UserProfile isOpen={showForm} closeModal={closeModal} />

      <div>
        {data && data.map((item) => (
          <div key={item._id}>
            <h2 id='year'>Year: {item.Year}</h2>
            <hr />
            <div>
              {item.Songs && item.Songs.map((song) => (
                <div key={song._id}>
                  <p>Song: {song.Song}</p>
                  <p>Artist: {song.Artist}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
