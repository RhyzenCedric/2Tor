import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EducatorSelectionScreen.css';
import NavigationMainScreenUser from '../../NavigationBars/NavigationMainScreen/NavigationMainScreenUser';

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
    <>
      <div>
        <NavigationMainScreenUser />
      </div>
      <div className="educator-selection-menu">
        <section>
          <div className="heading">
            <h2>Educators for {subject}</h2>
          </div>
          <div className="subject-buttons-container">
            {educators.map((educator, index) => (
              <button
                key={index}
                className="subject-button"
                onClick={() => handleEducatorClick(educator)}
              >
                {educator.educator_fullname}
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
