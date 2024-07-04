import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EducatorSelectionScreen.css';
import NavigationMainScreenUser from '../../NavigationBars/NavigationMainScreen/NavigationMainScreenUser';

export default function EducatorSelectionScreen() {
  const { subject } = useParams();
  const [educators, setEducators] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch educators
    axios.get(`http://localhost:5000/educators/subjects_taught/${subject}`)
      .then(res => {
        setEducators(res.data);
      })
      .catch(err => {
        console.log('Error fetching educators for subject:', err);
      });

    // Fetch reviews
    axios.get('http://localhost:5000/reviews')
      .then(res => {
        setReviews(res.data);
      })
      .catch(err => {
        console.log('Error fetching reviews:', err);
      });
  }, [subject]);

  const calculateAverageRating = (educator) => {
    const educatorReviews = reviews.filter(review => 
      review.subject_name === subject && review.educator_fullname === educator.educator_fullname
    );

    const totalRating = educatorReviews.reduce((total, review) => total + review.rating, 0);
    return educatorReviews.length ? totalRating / educatorReviews.length : 0;
  };

  const rankedEducators = [...educators].sort((a, b) => calculateAverageRating(b) - calculateAverageRating(a));

  const handleEducatorClick = (educator) => {
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
            {rankedEducators.map((educator, index) => (
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
