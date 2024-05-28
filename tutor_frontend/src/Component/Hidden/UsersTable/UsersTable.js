import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './UsersTable.css'; // Import the CSS file

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdateUser = (username) => {
    navigate(`/UpdateUser/${username}`);
  }

  const handleDeleteUser = async (username) => {
    try {
      await axios.delete(`http://localhost:5000/users/${username}`);
      // Remove the deleted user from the state
      setUsers(users.filter(user => user.user_username !== username));
      toast.success("User Deleted")
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="users-table-container">
      <h2>Users</h2>
      <Link to='/AddUsers' className="add-user-btn">Add User</Link>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.user_username}</td>
              <td>{user.user_fullname}</td>
              <td>{user.user_email}</td>
              <td>{user.user_phonenum}</td>
              <td className="actions-btns">
                <button className="edit-btn" onClick={() => handleUpdateUser(user.user_username)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteUser(user.user_username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
