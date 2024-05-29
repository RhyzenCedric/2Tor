import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import NavigationMainScreenUser from '../../NavigationBars/NavigationMainScreen/NavigationMainScreenUser';

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [userReviews, setUserReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const { user_username } = JSON.parse(user);
      axios.get(`http://localhost:5000/users/${user_username}`)
        .then(res => {
          setUserData(res.data);
          // Fetch reviews made by the user
          axios.get(`http://localhost:5000/user-reviews/${user_username}`)
            .then(res => {
              setUserReviews(res.data);
            })
            .catch(err => {
              console.log('Error fetching user reviews:', err);
            });
        })
        .catch(err => {
          console.log('Error fetching user data:', err);
        });
    } else {
      console.log('No user data found in session storage.');
    }
  }, []);

  const handleEditProfile = () => {
    navigate(`/EditUserProfile/${userData.user_username}`);
  };

  const handleDeleteProfile = () => {
    // Implement delete profile functionality
  };

  const handleReturnButton = () => {
    navigate('/MainUserMenu');
  };

  return (
<>
  <div>
    <NavigationMainScreenUser/>
  </div>
  <div className="profile-container">
    <div className="profile-details">
      {userData ? (
        <>
          <h2>User Profile</h2>
          <p><strong>Username:</strong> {userData.user_username}</p>
          <p><strong>Full Name:</strong> {userData.user_fullname}</p>
          <p><strong>Email:</strong> {userData.user_email}</p>
          <p><strong>Password:</strong> {userData.user_password}</p>
          <p><strong>Phone Number:</strong> {userData.user_phonenum}</p>
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
    {userReviews.length > 0 && (
      <>
        <h3>User Reviews</h3>
        {userReviews.map(review => (
          <div className="review" key={review.review_id}>
            <p><strong>Review:</strong> {review.review_text}</p>
            <p><strong>Educator:</strong> {review.educator_fullname}</p>
            <p><strong>Subject:</strong> {review.subject_name}</p>
            <hr />
          </div>
        ))}
      </>
    )}
  </div>
</>

  );
}
