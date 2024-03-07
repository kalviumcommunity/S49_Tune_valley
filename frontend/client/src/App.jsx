import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import axios from 'axios';
import UserProfile from './components/UserProfile';
import Year from './components/Year';
import Fav from './components/Fav';
import CreateFav from './components/CreateFav';
import FavUpdate from './components/FavUpdate';

function App() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/getTunevalley')
      .then(res => setData(res.data))
      .catch((err) => console.error(err));
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
        <a href='fav'>Fav</a>
 
      </nav>
      <UserProfile isOpen={showForm} closeModal={closeModal} />
       {/* <Year data={data}/> */}
      <BrowserRouter>
      <Routes>
        <Route path='/fav' element={<Fav/>} ></Route>
        <Route path='/create' element={<CreateFav/>} ></Route>
        <Route path='/update/:id' element={<FavUpdate />} ></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;