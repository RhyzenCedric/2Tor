import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Rankings.css';

export default function Rankings() {
  const [userFullname, setFullname] = useState('');
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  const handleSubjectClick = (subject) => {
    navigate(`/RankingbySubjects/${subject}`);
  };
  
  useEffect(() => {
    // const user = sessionStorage.getItem('user');
    // if (user) {
    //   const { user_username } = JSON.parse(user);
    //   axios.get(`http://localhost:5000/users/${user_username}`)
    //     .then(res => {
    //       setFullname(res.data.user_fullname);
    //       console.log(res.data);
    //     })
    //     .catch(err => {
    //       console.log('Error fetching user data:', err);
    //     });
      
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
    // } else {
    //   console.log('No user data found in session storage.');
    // }
  }, []);

  return (
    <>
      <div className="ranking-menu">
        <section>
          <div className="heading">
            <h2>Select a subject to view its Educator Ranking:</h2>
          </div>
          <div className="subject-buttons-container">
            {subjects.map((subject, index) => (
              <button key={index} className="subject-button" onClick={() => handleSubjectClick(subject)}>
                {subject}
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
