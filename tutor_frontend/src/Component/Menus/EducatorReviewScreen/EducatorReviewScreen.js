import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EducatorReviewScreen() {
    const { username, subject } = useParams(); // Retrieve subject from params
    const [userFullname, setUserFullname] = useState('');
    const [userUsername, setUserusername] = useState('');
    const [educatorFullname, setEducatorFullname] = useState('');
    const [educatorUsername, setEducatorusername] = useState('');
    const [review, setReview] = useState(''); // State for storing the review

  // Function to handle review submission
  const handleReviewSubmit = async (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // Fetch user data based on the logged-in user's session
    const user = sessionStorage.getItem('user');
    if (user) {
      const { user_username } = JSON.parse(user);
      axios.get(`http://localhost:5000/users/${user_username}`)
        .then(res => {
          setUserFullname(res.data.user_fullname);
          setUserusername(res.data.user_username);
        })
        .catch(err => {
          console.log('Error fetching user data:', err);
        });
    }

    // Fetch educator data based on the selected educator
    axios.get(`http://localhost:5000/educators/${username}`)
      .then(res => {
        setEducatorFullname(res.data.educator_fullname);
        setEducatorusername(res.data.educator_username);
      })
      .catch(err => {
        console.log('Error fetching educator data:', err);
      });
  }, [username]);

  return (
    <div>
      <h1>Educator Review Screen</h1>
      <form onSubmit={handleReviewSubmit}>
        <div>
          <label>User Full Name:</label>
          <p>{userFullname}</p>
        </div>
        <div>
          <label>Educator Full Name:</label>
          <p>{educatorFullname}</p>
        </div>
        <div>
          <label>Subject:</label>
          <p>{subject}</p>
        </div>
        <div>
          <label>Review:</label>
          <textarea
            value={review}
            onChange={(event) => setReview(event.target.value)}
            placeholder="Write your review here..."
            rows={4}
            cols={50}
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
