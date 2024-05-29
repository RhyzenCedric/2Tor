import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EducAuth from '../../EducAuth';
import NavigationMainScreenEducator from '../../NavigationBars/NavigationMainScreen/NavigationMainScreenEducator';

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

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5000/appointments/${appointmentId}`, {
        appointment_status: 'COMPLETED'
      });
      // Update the UI after updating the appointment status
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.appointment_id === appointmentId
            ? { ...appointment, appointment_status: 'COMPLETED' }
            : appointment
        )
      );
    } catch (error) {
      console.error('Error completing appointment:', error);
    }
  };

  const redirectToProfile = () => {
    navigate('/EducatorProfile');
  };

  return (
    <>
      <div>
        <NavigationMainScreenEducator />
      </div>
      <div>
        {educatorFullname ? (
          <div>
            <h1>Welcome, {educatorFullname}!</h1>
            <h2>Appointments</h2>
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Action</th> {/* New column for action */}
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment.appointment_id}>
                    <td>{appointment.user_fullname}</td>
                    <td>{appointment.date_booked}</td>
                    <td>{appointment.subject_name}</td>
                    <td>{appointment.appointment_status}</td>
                    <td>
                      <button
                        onClick={() => handleCompleteAppointment(appointment.appointment_id)}
                        disabled={appointment.appointment_status === 'COMPLETED'}
                      >
                        Completed
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
}
