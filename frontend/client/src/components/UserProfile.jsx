import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import "./UserProfile.css"

// Set the app element for react-modal
Modal.setAppElement('#root');

function UserProfile({ isOpen, closeModal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the specified API endpoint
      const Response = await axios.post('http://localhost:8000/postUserData', formData);
      alert('User profile saved successfully!');
      closeModal();

      // Fetch the user data after saving
      const userDataResponse = await axios.get('http://localhost:8000/getUserData');
      console.log('User data:', userDataResponse.data);
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };
  

  return (
    <div>
      <Modal
        className="user-profile-form"
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="User Profile Modal"
      >
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          <label>Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>password</label>
          <input type="" id="password" name="password" value={formData.password} onChange={handleChange} required />
          <button type="submit" onClick={handleSubmit} >Save Profile</button>
          <button type="button" onClick={closeModal}>Close</button>
        </form>
      </Modal>
    </div>
  );
}

export default UserProfile;
