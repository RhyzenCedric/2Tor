import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Calendar from '../../Calendar';
import { toast } from 'react-toastify';

export default function EducatorBookingScreen() {
  const { username, subject } = useParams();
  const [userFullname, setUserFullname] = useState('');
  const [userUsername, setUserusername] = useState('');
  const [educatorFullname, setEducatorFullname] = useState('');
  const [educatorUsername, setEducatorusername] = useState('');
  const [isDoubleBooking, setIsDoubleBooking] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
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

    axios.get(`http://localhost:5000/educators/${username}`)
      .then(res => {
        setEducatorFullname(res.data.educator_fullname);
        setEducatorusername(res.data.educator_username);
      })
      .catch(err => {
        console.log('Error fetching educator data:', err);
      });

    // Fetch reviews for the specific educator and subject
    axios.get(`http://localhost:5000/reviews/${username}/${subject}`)
      .then(res => {
        setReviews(res.data);
      })
      .catch(err => {
        console.log('Error fetching reviews:', err);
      });

    // Implement logic to check for double booking
    // setIsDoubleBooking(checkForDoubleBooking()); // Implement this function
  }, [username, subject]);

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/createappointment', {
        user_fullname: userFullname,
        user_username: userUsername,
        educator_fullname: educatorFullname,
        educator_username: educatorUsername,
        subject_name: subject,
        date_booked: bookingDate
      });
      toast.success('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div>
      <h1>Booking Details</h1>
      <form onSubmit={handleBookingSubmit}>
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
          <label>Booking Date:</label>
          <Calendar selectedDate={bookingDate} onDateChange={setBookingDate} />
        </div>
        {isDoubleBooking && <p style={{ color: 'red' }}>This slot is already booked. Please choose another slot.</p>}
        <button type="submit">Book Slot</button>
        <Link to={`/EducatorReviewScreen/${username}/${subject}`}>
          <button>Leave a Review</button>
        </Link>
      </form>
      
      <h2>Reviews for {educatorFullname} on {subject}</h2>
        {reviews.length === 0 ? (
        <p>No reviews available</p>
        ) : (
        reviews.map(review => (
            <div key={review.review_id}>
            <p>User: {review.user_fullname}</p>
            <p>Review: {review.review_text}</p>
            <hr />
            </div>
        )))}
    </div>
  );
}
