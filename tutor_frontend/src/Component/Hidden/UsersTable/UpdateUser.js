import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import validation from '../../RegisterUserValidation';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function UpdateUser() {
    const [values, setValues] = useState({
        user_username: '',
        user_password: '',
        user_fullname: '',
        user_email: '',
        user_phonenum: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { username } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${username}`)
            .then(response => {
                setValues(response.data);
            })
            .catch(error => {
                console.error('Error retrieving user data:', error);
                // Handle error, e.g., display error message
            });
    }, [username]);

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validation(values));
    };

    useEffect(() => {
        // Check errors state after it's updated
        if (Object.values(errors).every(error => error === "")) {
            axios.put(`http://localhost:5000/users/${values.user_username}`, values)
                .then(res => {
                    toast.success("Update Successful"); // Display success message
                    navigate('/UsersTable');
                })
                .catch(err => {
                    console.error(err);
                    
                });
        }
    }, [errors]); // Run this effect whenever errors state changes

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100 vw-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='user_username'><strong>Username</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Username'
                            name='user_username'
                            value={values.user_username || ''}
                            disabled
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.user_username && <span className='text-danger'>{errors.user_username}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='user_password'>Password</label>
                        <input
                            type='text'
                            placeholder='Enter password'
                            name='user_password'
                            value={values.user_password || ''}
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.user_password && <span className='text-danger'>{errors.user_password}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='user_fullname'><strong>Full Name</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Full Name'
                            name='user_fullname'
                            value={values.user_fullname || ''}
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.user_fullname && <span className='text-danger'>{errors.user_fullname}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='user_email'><strong>Email</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Email'
                            name='user_email'
                            value={values.user_email || ''}
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.user_email && <span className='text-danger'>{errors.user_email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='user_phonenum'><strong>Phone Number</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Phone Number'
                            name='user_phonenum'
                            value={values.user_phonenum || ''}
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.user_phonenum && <span className='text-danger'>{errors.user_phonenum}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong>Edit</strong></button>
                </form>
            </div>
        </div>
    );
}
