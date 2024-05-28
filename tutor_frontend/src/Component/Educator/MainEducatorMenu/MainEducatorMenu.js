import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, useNavigate } from 'react-router-dom';
import EducAuth from '../../EducAuth';

export default function MainEducatorUserMenu() {
  EducAuth();
  const [educatorFullname, setEducatorFullname] = useState('');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const educator = sessionStorage.getItem('educator');
    if (educator) {
      const { educator_username } = JSON.parse(educator);
      // Fetch educator fullname
      axios.get(`http://localhost:5000/educators/${educator_username}`)
        .then(res => {
          setEducatorFullname(res.data.educator_fullname);
        })
        .catch(err => {
          console.log('Error fetching educator data:', err);
        });

      // Fetch appointments for the educator
      axios.get(`http://localhost:5000/appointments/${educator_username}`)
        .then(res => {
          setAppointments(res.data);
        })
        .catch(err => {
          console.log('Error fetching appointments:', err);
        });
    } else {
      console.log('No educator data found in session storage.');
    }
  }, []);

  const redirectToProfile = () => {
    navigate('/EducatorProfile');
  };

  return (
    <div>
      {educatorFullname ? (
        <div>
          <h1>Welcome, {educatorFullname}!</h1>
          <button onClick={redirectToProfile}>Go to Profile</button>
          <h2>Appointments</h2>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Date</th>
                <th>Subject</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.appointment_id}>
                  <td>{appointment.user_fullname}</td>
                  <td>{appointment.date_booked}</td>
                  <td>{appointment.subject_name}</td>
                  {/* Add more table cells for additional appointment data */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
