import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div>
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <p>Username: {userData.user_username}</p>
          <p>Full Name: {userData.user_fullname}</p>
          <p>Email: {userData.user_email}</p>
          <p>Password: {userData.user_password}</p>
          <p>Phone Number: {userData.user_phonenum}</p>
          <button onClick={handleEditProfile}>Edit Profile</button>
          <button onClick={handleDeleteProfile}>Delete Profile</button>
          <button onClick={handleReturnButton}>Back</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {userReviews.length > 0 && (
        <div>
          <h3>User Reviews</h3>
          {userReviews.map(review => (
            <div key={review.review_id}>
              <p>Review: {review.review_text}</p>
              <p>Educator: {review.educator_fullname}</p>
              <p>Subject: {review.subject_name}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
