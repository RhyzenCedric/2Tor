import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EducatorBookingScreen() {
  const { username, subject } = useParams(); // Retrieve subject from params
  const [userFullname, setUserFullname] = useState('');
  const [educatorFullname, setEducatorFullname] = useState('');
  const [isDoubleBooking, setIsDoubleBooking] = useState(false);

  useEffect(() => {
    // Fetch user data based on the logged-in user's session
    const user = sessionStorage.getItem('user');
    if (user) {
      const { user_username } = JSON.parse(user);
      axios.get(`http://localhost:5000/users/${user_username}`)
        .then(res => {
          setUserFullname(res.data.user_fullname);
        })
        .catch(err => {
          console.log('Error fetching user data:', err);
        });
    }

    // Fetch educator data based on the selected educator
    axios.get(`http://localhost:5000/educators/${username}`)
      .then(res => {
        setEducatorFullname(res.data.educator_fullname);
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
  const handleBookingSubmit = (event) => {
    event.preventDefault();
    // Implement booking submission logic here
    // You can post the booking details to the backend server
    // Make sure to handle any errors and update UI accordingly
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
        {/* Display calendar for booking */}
        {/* Implement double booking check UI */}
        {isDoubleBooking && <p style={{ color: 'red' }}>This slot is already booked. Please choose another slot.</p>}
        <button type="submit">Book Slot</button>
      </form>
    </div>
  );
}
