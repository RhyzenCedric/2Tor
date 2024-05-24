import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const { user_username } = JSON.parse(user);
      axios.get(`http://localhost:5000/users/${user_username}`)
        .then(res => {
          setUserData(res.data);
        })
        .catch(err => {
          console.log('Error fetching user data:', err);
        });
    } else {
      console.log('No user data found in session storage.');
    }
  }, []);

  const handleEditProfile = () => {
    // Navigate to edit profile page
  };

  const handleDeleteProfile = () => {
    // Implement delete profile functionality
  };

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <p>Username: {userData.user_username}</p>
          <p>Full Name: {userData.user_fullname}</p>
          <p>Email: {userData.user_email}</p>
          <p>Password: {userData.user_password}</p>
          <p>Phone Number: {userData.user_phonenum}</p>
          <button onClick={handleEditProfile}>Edit Profile</button>
          <button onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
