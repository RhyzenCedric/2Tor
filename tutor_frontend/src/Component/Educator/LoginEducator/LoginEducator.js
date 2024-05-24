import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from '../../LoginEducatorValidation';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function LoginEducator() {
    const [values, setValues] = useState({
        educator_username: '',
        educator_password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        // Check errors state after it's updated
        if (errors.educator_username === "" && errors.educator_password === "") {
            axios.post('http://localhost:5000/logineducator', values)
                .then(res => {
                    if (res.data === "Success") {
                        navigate('/MainEducatorMenu');
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
                        <label htmlFor='educator_username'><strong>Username</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Username'
                            onChange={handleInput}
                            className='form-control rounded-0'
                            name='educator_username' // Adjusted name attribute
                        />
                        {errors.educator_username && <span className='text-danger'>{errors.educator_username}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='educator_password'>Password</label>
                        <input
                            type='password'
                            placeholder='Enter password'
                            onChange={handleInput}
                            className='form-control rounded-0'
                            name='educator_password' // Adjusted name attribute
                        />
                        {errors.educator_password && <span className='text-danger'>{errors.educator_password}</span>}
                    </div>
                    <button type="submit" className='btn btn-success w-100'><strong>Log In</strong></button>
                    <Link to="/RegisterEducator" className='btn btn-default border w-100'>New Educator</Link>
                </form>
            </div>
        </div>
    );
}
