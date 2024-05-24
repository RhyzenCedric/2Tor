import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from '../../RegisterUserValidation';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function RegisterUser() {
    const [values, setValues] = useState({
        user_username: '',
        user_password: '',
        user_fullname: '',
        user_email: '',
        user_phonenum: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        // Check errors state after it's updated
        if (errors.user_username === "" && errors.user_fullname === "" && errors.user_password === "" && errors.user_email === "" && errors.user_phonenum === "") {
            axios.post('http://localhost:5000/registeruser', values)
                .then(res => {
                    toast.success("Registration Successful"); // Display success message
                    navigate('/loginUser');
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Registration Failed"); // Display error message
                });
        }
    }, [errors]); // Run this effect whenever errors state changes

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validation(values));
    };

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
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.user_username && <span className='text-danger'>{errors.user_username}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='user_password'>Password</label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            name='user_password'
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
                            onChange={handleInput}
                            className='form-control rounded-0'
                        />
                        {errors.user_phonenum && <span className='text-danger'>{errors.user_phonenum}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong>Register</strong></button>
                    <Link to="/loginUser" className='btn btn-default border w-100'>Login</Link>
                </form>
            </div>
        </div>
    );
}
