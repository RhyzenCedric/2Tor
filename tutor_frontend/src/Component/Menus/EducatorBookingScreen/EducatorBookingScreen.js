import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Calendar from '../../Calendar';
import { toast } from 'react-toastify';
import NavigationMainScreenUser from '../../NavigationBars/NavigationMainScreen/NavigationMainScreenUser';
import './EducatorBookingScreen.css'; // Import the CSS file

export default function EducatorBookingScreen() {
  const { username, subject } = useParams();
  const [userFullname, setUserFullname] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [educatorFullname, setEducatorFullname] = useState('');
  const [educatorUsername, setEducatorUsername] = useState('');
  const [isDoubleBooking, setIsDoubleBooking] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [reviews, setReviews] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false); // State to track booking success
  const [alreadyBooked, setAlreadyBooked] = useState(false); // State to track if the user has already booked

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      const { user_username } = JSON.parse(user);
      axios.get(`http://localhost:5000/users/${user_username}`)
        .then(res => {
          setUserFullname(res.data.user_fullname);
          setUserUsername(res.data.user_username);
          // Check if the user has already booked this educator for this subject
          return axios.get(`http://localhost:5000/appointments/${user_username}/${username}/${subject}`);
        })
        .then(res => {
          if (res.data.length > 0) {
            setAlreadyBooked(true);
          }
        })
        .catch(err => {
          console.log('Error fetching user or booking data:', err);
        });
    }

    axios.get(`http://localhost:5000/educators/${username}`)
      .then(res => {
        setEducatorFullname(res.data.educator_fullname);
        setEducatorUsername(res.data.educator_username);
      })
      .catch(err => {
        console.log('Error fetching educator data:', err);
      });

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
    if (!bookingDate) {
      toast.error('Booking date is required');
      return;
    }
    try {
      await axios.post('http://localhost:5000/createappointment', {
        user_fullname: userFullname,
        user_username: userUsername,
        educator_fullname: educatorFullname,
        educator_username: educatorUsername,
        subject_name: subject,
        date_booked: bookingDate,
        appointment_status: "ACTIVE" // Set appointment status to ACTIVE
      });
      toast.success('Appointment booked successfully!');
      setBookingSuccess(true); // Set booking success to true on successful booking
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <>
      <div>
        <NavigationMainScreenUser />
      </div>
      <div className="booking-container">
        <h1>Booking {educatorFullname} for {subject} lessons</h1>
        <form className="booking-form" onSubmit={handleBookingSubmit}>
          <div className="form-group">
            <label>User Full Name:</label>
            <p>{userFullname}</p>
          </div>
          <div className="form-group">
            <label>Educator Full Name:</label>
            <p>{educatorFullname}</p>
          </div>
          <div className="form-group">
            <label>Subject:</label>
            <p>{subject}</p>
          </div>
          <div className="form-group">
            <label>Booking Date:</label>
            <Calendar selectedDate={bookingDate} onDateChange={setBookingDate} />
          </div>
          {isDoubleBooking && <p style={{ color: 'red' }}>This slot is already booked. Please choose another slot.</p>}
          <button type="submit" disabled={alreadyBooked}>Book Slot</button>
          <Link to={`/EducatorReviewScreen/${username}/${subject}`}>
            <button disabled={!bookingSuccess} className='w-100'>Leave a Review</button>
          </Link>
        </form>
        
        <h2>Reviews for {educatorFullname} on {subject}</h2>
        <div className="reviews-container">
          {reviews.length === 0 ? (
            <p>No reviews available</p>
          ) : (
            reviews.map(review => (
              <div className="review-card" key={review.review_id}>
                <p className="review-user">User: {review.user_fullname}</p>
                <p className="review-text">Review: {review.review_text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
