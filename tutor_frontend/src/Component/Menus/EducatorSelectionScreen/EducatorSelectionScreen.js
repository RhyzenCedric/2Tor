import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EducatorSelectionScreen() {
  const { subject } = useParams();
  const [educators, setEducators] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/educators/subjects_taught/${subject}`)
      .then(res => {
        setEducators(res.data);
      })
      .catch(err => {
        console.log('Error fetching educators for subject:', err);
      });
  }, [subject]);

  const handleEducatorClick = (educator) => {
    // Handle the logic when an educator is clicked, e.g., navigate to educator profile
    console.log('Educator clicked:', educator);
    navigate(`/EducatorBookingScreen/${educator.educator_username}/${subject}`);
  };

  return (
    <div>
      <h1>Educators for {subject}</h1>
      <div>
        {educators.map((educator, index) => (
          <button key={index} onClick={() => handleEducatorClick(educator)}>
            {educator.educator_fullname}
          </button>
        ))}
      </div>
    </div>
  );
}
