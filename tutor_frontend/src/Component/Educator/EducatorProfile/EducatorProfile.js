import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EducatorProfile.css'; // Reusing the styling from UserProfile component
import NavigationMainScreenEducator from '../../NavigationBars/NavigationMainScreen/NavigationMainScreenEducator';

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
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios.delete(`http://localhost:5000/educators/${educatorData.educator_username}`)
        .then(res => {
          console.log(res.data.message);
          sessionStorage.removeItem('educator');
          navigate('/');
          alert("Your account has been deleted.");
        })
        .catch(err => {
          console.log('Error deleting educator:', err);
        });
    }
  };

  const handleReturnButton = () => {
    navigate('/MainEducatorMenu');
  };

  return (
    <>
      <div>
        <NavigationMainScreenEducator/>
      </div>
      <div className="profile-container">
        <div className="profile-details">
          {educatorData ? (
            <>
              <h2>Educator Profile</h2>
              <p><strong>Username:</strong> {educatorData.educator_username}</p>
              <p><strong>Full Name:</strong> {educatorData.educator_fullname}</p>
              <p><strong>Email:</strong> {educatorData.educator_email}</p>
              <p><strong>Password:</strong> {educatorData.educator_password}</p>
              <p><strong>Phone Number:</strong> {educatorData.educator_phonenum}</p>
              <p><strong>Subjects Taught: </strong>{educatorData.subjects_taught.split(',').map((subject, index) => (
              <span key={index}>{subject.trim()}{index < educatorData.subjects_taught.split(',').length - 1 ? ', ' : ''}</span>
              ))}
              </p>
              <div className="profile-buttons">
                <button className="edit-button" onClick={handleEditProfile}>Edit Profile</button>
                <button className="delete-button" onClick={handleDeleteProfile}>Delete Profile</button>
                <button className="return-button" onClick={handleReturnButton}>Back</button>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <div className="reviews-container">
        {educatorReviews.length > 0 && (
          <>
            <h3>Educator Reviews</h3>
            {educatorReviews.map(review => (
              <div className="review" key={review.review_id}>
                <p><strong>Review:</strong> {review.review_text}</p>
                <p><strong>Rating:</strong> {review.sentiment_score}</p>
                <hr />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
