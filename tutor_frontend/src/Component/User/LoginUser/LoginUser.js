import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from '../../LoginUserValidation';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function LoginUser() {
    const [values, setValues] = useState({
        user_username: '',
        user_password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        // Check errors state after it's updated
        if (errors.user_username === "" && errors.user_password === "") {
            axios.post('http://localhost:5000/loginuser', values)
                .then(res => {
                    if (res.data === "Success") {
                        navigate('/MainUserMenu');
                        toast.success("Logged In Successfully");
                    } else {
                        toast.error("No Record existed"); // Display error message
                    }
                })
                .catch(err => console.log(err));
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
                            onChange={handleInput}
                            className='form-control rounded-0'
                            name='user_username' // Adjusted name attribute
                        />
                        {errors.user_username && <span className='text-danger'>{errors.user_username}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='user_password'>Password</label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            onChange={handleInput}
                            className='form-control rounded-0'
                            name='user_password' // Adjusted name attribute
                        />
                        {errors.user_password && <span className='text-danger'>{errors.user_password}</span>}
                    </div>
                    <button type="submit" className='btn btn-success w-100'><strong>Log In</strong></button>
                    <Link to="/RegisterUser" className='btn btn-default border w-100'>New User</Link>
                </form>
            </div>
        </div>
    );
}
