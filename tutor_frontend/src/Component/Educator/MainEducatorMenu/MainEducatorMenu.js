import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MainEducatorMenu() {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const educator = sessionStorage.getItem('educator');
    if (educator) {
      const { educator_username } = JSON.parse(educator);
      axios.get(`http://localhost:5000/educators/${educator_username}`)
        .then(res => {
          setFullName(res.data.educator_fullname);
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
