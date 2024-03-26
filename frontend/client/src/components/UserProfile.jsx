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
      
      Cookies.set('accessToken', Response.data.accessToken);
      localStorage.setItem('localuser', formData.name); // Save the user's name in local storage
      
      console.log("token", Cookies.get('accessToken'));
  
      setFormData({
        name: '',
        email: '',
        password: ''
      });
  
      alert('User profile saved successfully!');
      navigate('/year');
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const handleSignOut = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('localuser'); // Remove the user's name from local storage
    navigate('/');
  };

  // Check if the user's name is present in local storage
  const isLoggedIn = !!localStorage.getItem('localuser');

  return (
    <div id="user-profile-container">
      {isLoggedIn ? ( // If the user is logged in, show the sign-out button
        <button type="button" onClick={handleSignOut}>Sign Out</button>
      ) : ( // Otherwise, show the form to enter user data
        <div>
          <h2>User Profile</h2>
          <form onSubmit={handleSubmit} className="user-profile-form">
            <label>Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            <label>Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            <label>Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /> <br />
            <button type="submit">Save Profile</button>
            <Link to="/" ><button type="button">Close</button></Link>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
