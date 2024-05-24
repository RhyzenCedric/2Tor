import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MainUserMenu() {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const { user_username } = JSON.parse(user);
      axios.get(`http://localhost:5000/users/${user_username}`)
        .then(res => {
          setFullName(res.data.user_fullname);
        })
        .catch(err => {
          console.log('Error fetching user data:', err);
        });
    } else {
      console.log('No user data found in session storage.');
    }
  }, []);

  return (
    <div>
      {fullName ? <h1>Welcome, {fullName}!</h1> : <h1>Loading...</h1>}
    </div>
  );
}
