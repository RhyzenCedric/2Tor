import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MainUserMenu() {
  const [userFullname, setFullname] = useState('');
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

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
      
      // Fetching subjects taught by educators
      axios.get('http://localhost:5000/educators')
        .then(res => {
          const subjects = res.data
            .flatMap(educator => typeof educator.subjects_taught === 'string' ? JSON.parse(educator.subjects_taught) : educator.subjects_taught)
            .filter((subject, index, self) => self.indexOf(subject) === index); // Remove duplicates
          setSubjects(subjects);
        })
        .catch(err => {
          console.log('Error fetching subjects:', err);
        });
    } else {
      console.log('No user data found in session storage.');
    }
  }, []);

  const redirectToProfile = () => {
    navigate('/UserProfile');
  };


  const handleSubjectClick = (subject) => {
    navigate(`/EducatorSelectionScreen/${subject}`);
  };
  
  return (
    <div>
      {userFullname ? (
        <div>
          <h1>Welcome, {userFullname}!</h1>
          <button onClick={redirectToProfile}>Go to Profile</button>
          <h2>Select a Subject:</h2>
          <div>
            {subjects.map((subject, index) => (
              <button key={index} onClick={() => handleSubjectClick(subject)}>
                {subject}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
