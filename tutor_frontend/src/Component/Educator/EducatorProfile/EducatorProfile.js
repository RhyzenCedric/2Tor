import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EducatorProfile() {
  const [educatorData, setEducatorData] = useState(null);

  useEffect(() => {
    const educator = sessionStorage.getItem('educator');
    if (educator) {
      const { educator_username } = JSON.parse(educator);
      axios.get(`http://localhost:5000/educators/${educator_username}`)
        .then(res => {
          setEducatorData(res.data);
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
      {educatorData ? (
        <div>
          <h2>Educator Profile</h2>
          <p>Username: {educatorData.educator_username}</p>
          <p>Full Name: {educatorData.educator_fullname}</p>
          <p>Email: {educatorData.educator_email}</p>
          <p>Password: {educatorData.educator_password}</p>
          <p>Phone Number: {educatorData.educator_phonenum}</p>
          <button onClick={handleEditProfile}>Edit Profile</button>
          <button onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
