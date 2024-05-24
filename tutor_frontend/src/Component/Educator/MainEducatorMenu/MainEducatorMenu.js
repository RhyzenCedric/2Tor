import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, useNavigate } from 'react-router-dom';

export default function MainEducatorUserMenu() {
  const [educator_fullname, setFullname] = useState('');
  const navigate =useNavigate();

  useEffect(() => {
    const educator = sessionStorage.getItem('educator');
    if (educator) {
      const { educator_username } = JSON.parse(educator);
      axios.get(`http://localhost:5000/educators/${educator_username}`)
        .then(res => {
          setFullname(res.data.educator_fullname);
          console.log(res.data);
        })
        .catch(err => {
          console.log('Error fetching user data:', err);
        });
    } else {
      console.log('No user data found in session storage.');
    }
  }, []);

  const redirectToProfile = () => {
    navigate('/EducatorProfile');
  }

  return (
    <div>
      {educator_fullname ? (
        <div>
          <h1>Welcome, {educator_fullname}!</h1>
          <button onClick={redirectToProfile}>Go to Profile</button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
