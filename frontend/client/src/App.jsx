import React, { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import axios from 'axios';
import UserProfile from './components/UserProfile';
import Year from './components/Year';
import Fav from './components/Fav';
import CreateFav from './components/CreateFav';
import FavUpdate from './components/FavUpdate';
import Navbar from './components/Navbar';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/getTunevalley')
      .then(res => setData(res.data))
      .catch((err) => console.error(err));
  }, []);



  return (
    <>
    <Navbar/>
      <Routes>
      <Route path='/' element={ <UserProfile/>} />
      <Route path='/year' element={ <Year data={data}/>} />
        <Route path='/fav' element={<Fav/>} />
        <Route path='/create' element={<CreateFav/>} />
        <Route path='/update/:id' element={<FavUpdate />} />
      </Routes>
    </>
  );
}

export default App;