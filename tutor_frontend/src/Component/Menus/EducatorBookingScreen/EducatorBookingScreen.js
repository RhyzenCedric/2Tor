import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import Calendar from '../../Calendar'; // Import the Calendar component
import { toast } from 'react-toastify';

export default function EducatorBookingScreen() {
  const { username, subject } = useParams(); // Retrieve subject from params
  const [userFullname, setUserFullname] = useState('');
  const [userUsername, setUserusername] = useState('');
  const [educatorFullname, setEducatorFullname] = useState('');
  const [educatorUsername, setEducatorusername] = useState('');
  const [isDoubleBooking, setIsDoubleBooking] = useState(false);
  const [bookingDate, setBookingDate] = useState('');

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

    // Implement logic to check for double booking
    // You may need to fetch booking data for the selected educator and subject
    // Then, check if the desired booking slot is available
    // For demonstration, let's assume there's no double booking check
    // setIsDoubleBooking(checkForDoubleBooking()); // Implement this function
  }, [username]);

  // Function to handle booking submission
  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to create the appointment
      await axios.post('http://localhost:5000/createappointment', {
        user_fullname: userFullname,
        user_username: userUsername,
        educator_fullname: educatorFullname,
        educator_username: educatorUsername,
        subject_name: subject,
        date_booked: bookingDate
      });
      // If successful, display a success message or handle UI accordingly
      toast.success('Appointment booked successfully!');
    } catch (error) {
      // If an error occurs, handle it and display an error message or handle UI accordingly
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
        {/* Display calendar for booking */}
        {/* Implement double booking check UI */}
        {isDoubleBooking && <p style={{ color: 'red' }}>This slot is already booked. Please choose another slot.</p>}
        <button type="submit">Book Slot</button>
        {/* Add review button with Link */}
        <Link to={`/EducatorReviewScreen/${username}/${subject}`}>
          <button>Leave a Review</button>
        </Link>
      </form>
    </div>
  );
}
