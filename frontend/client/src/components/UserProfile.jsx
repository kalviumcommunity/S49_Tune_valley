import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./UserProfile.css";

function UserProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Response = await axios.post('http://localhost:8000/postUserData', formData);
      console.log(Response.data);
      console.log('username0001', formData.email);
      Cookies.set('useremail', formData.email);
      // localStorage.setItem('userLocalStorage', formData.email)
      alert('User profile saved successfully!');
      const userDataResponse = await axios.get('http://localhost:8000/getUserData');
      console.log('User data:', userDataResponse.data);
      console.log("cookie", Cookies.get('useremail')); // Logging the cookie value
      // console.log("Local storage", localStorage.getItem(userLocalStorage))
      console.log(formData.email);
      navigate('/year') // Navigate to '/year' route
    } catch (error) {
      alert(error.response.data.message); // Displaying the error message
      console.log(error.response.data.message);
    }
  };

  const handleSignOut = () => {
    Cookies.remove('useremail'); // Remove the 'useremail' cookie
    // localStorage.removeItem(userLocalStorage)
    console.log("cookie", Cookies.get('useremail'));
    // console.log("Local Storage", localStorage.getItem(userLocalStorage));
    navigate('/year'); // Navigate to '/year' route
  };

  return (
    <div>
      {!Cookies.get('useremail') ? (
        <div>
          <h2>User Profile</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            <label>Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            <label>Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Save Profile</button>
            <Link to="/year"><button type="button">Close</button></Link>
          </form>
        </div>
      ) : (
        <button type="button" onClick={handleSignOut}>Sign Out</button>
      )}
    </div>
  );
}

export default UserProfile;
