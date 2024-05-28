import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EducatorsTable.css'; // Import the CSS file

export default function EducatorsTable() {
    const [educators, setEducators] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEducators();
    }, []);
    
    const fetchEducators = async () => {
        try {
            const response = await axios.get('http://localhost:5000/educators');
            setEducators(response.data);
        } catch (error) {
            console.error('Error fetching educators:', error);
        }
    };

    const handleUpdateEducator = (username) => {
        navigate(`/UpdateEducator/${username}`);
    }

    const handleDeleteEducator = async (username) => {
        try {
            await axios.delete(`http://localhost:5000/educators/${username}`);
            // Remove the deleted educator from the state
            setEducators(educators.filter(educator => educator.educator_username !== username));
            toast.success("Educator Deleted")
        } catch (error) {
            console.error('Error deleting educator:', error);
        }
    };

    return (
        <div className="educators-table-container">
            <h2>Educators</h2>
            <Link to='/AddEducators' className="add-educator-btn">Add Educator</Link>
            <table>
                <thead>
                    <tr>
                        <th>Educator ID</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {educators.map(educator => (
                        <tr key={educator.educator_id}>
                            <td>{educator.educator_id}</td>
                            <td>{educator.educator_username}</td>
                            <td>{educator.educator_fullname}</td>
                            <td>{educator.educator_email}</td>
                            <td>{educator.educator_phonenum}</td>
                            <td className="actions-btns">
                                <button className="edit-btn" onClick={() => handleUpdateEducator(educator.educator_username)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDeleteEducator(educator.educator_username)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
