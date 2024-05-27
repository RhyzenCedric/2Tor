import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EducatorProfile() {
  const [educatorData, setEducatorData] = useState(null);
  const [educatorReviews, setEducatorReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const educator = sessionStorage.getItem('educator');
    if (educator) {
      const { educator_username } = JSON.parse(educator);
      axios.get(`http://localhost:5000/educators/${educator_username}`)
        .then(res => {
          setEducatorData(res.data);
          // Fetch reviews for the specific educator
          axios.get(`http://localhost:5000/educator-reviews/${educator_username}`)
            .then(res => {
              setEducatorReviews(res.data);
            })
            .catch(err => {
              console.log('Error fetching educator reviews:', err);
            });
        })
        .catch(err => {
          console.log('Error fetching educator data:', err);
        });
    } else {
      console.log('No educator data found in session storage.');
    }
  }, []);

  const handleEditProfile = () => {
    navigate(`/EditEducatorProfile/${educatorData.educator_username}`);
  };

  const handleDeleteProfile = () => {
    // Implement delete profile functionality
  };

  const handleReturnButton = () => {
    navigate('/MainEducatorMenu');
  };

  return (
    <div>
      {educatorData ? (
        <div>
          <h2>Educator Profile</h2>
          <p>Username: {educatorData.educator_username}</p>
          <p>Full Name: {educatorData.educator_fullname}</p>
          <p>Email: {educatorData.educator_email}</p>
          <p>Subjects Taught: {educatorData.subjects_taught.split(',').map((subject, index) => (
              <span key={index}>{subject.trim()}{index < educatorData.subjects_taught.split(',').length - 1 ? ', ' : ''}</span>
            ))}
          </p>
          <p>Password: {educatorData.educator_password}</p>
          <p>Phone Number: {educatorData.educator_phonenum}</p>
          <button onClick={handleEditProfile}>Edit Profile</button>
          <button onClick={handleDeleteProfile}>Delete Profile</button>
          <button onClick={handleReturnButton}>Back</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {educatorReviews.length > 0 && (
        <div>
          <h3>Educator Reviews</h3>
          {educatorReviews.map(review => (
            <div key={review.review_id}>
              <p>Review: {review.review_text}</p>
              <p>Rating: {review.sentiment_score}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
