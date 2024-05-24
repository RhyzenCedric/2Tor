import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, useNavigate } from 'react-router-dom';

export default function MainUserMenu() {
  const [user_fullname, setFullname] = useState('');
  const navigate =useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const { user_username } = JSON.parse(user);
      axios.get(`http://localhost:5000/users/${user_username}`)
        .then(res => {
          setFullname(res.data.user_fullname);
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
    navigate('/UserProfile');
  }

  return (
    <div>
      {user_fullname ? (
        <div>
          <h1>Welcome, {user_fullname}!</h1>
          <button onClick={redirectToProfile}>Go to Profile</button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
