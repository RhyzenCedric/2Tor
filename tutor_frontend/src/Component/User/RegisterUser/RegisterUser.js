import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from '../../RegisterUserValidation';
import axios from 'axios';
import { toast } from 'react-toastify';
import './RegisterUser.css';
import logo_large from '../../../images/2TorLogo.png';

export default function RegisterUser() {
    const [values, setValues] = useState({
        user_username: '',
        user_password: '',
        user_fullname: '',
        user_email: '',
        user_phonenum: ''
    });
    const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        if (errors.user_username === "" && errors.user_fullname === "" && errors.user_password === "" && errors.user_email === "" && errors.user_phonenum === "") {
            axios.post('http://localhost:5000/registeruser', values)
                .then(res => {
                    toast.success("Registration Successful");
                    navigate('/loginUser');
                })
                .catch(err => {
                    console.log(err);
                    toast.error("Registration Failed");
                });
        }
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validation(values));
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    return (
        <div className='register-container'>
            <div className='register-box'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='user_username'><strong>Username</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Username'
                            name='user_username'
                            onChange={handleInput}
                            className='form-control'
                        />
                        {errors.user_username && <span className='text-danger'>{errors.user_username}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='user_password'><strong>Password</strong></label>
                        <div className='password-container'>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder='Enter Password'
                                name='user_password'
                                onChange={handleInput}
                                className='form-control'
                            />
                            <button type='button' className='toggle-password' onClick={togglePasswordVisibility}>
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.user_password && <span className='text-danger'>{errors.user_password}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='user_fullname'><strong>Full Name</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Full Name'
                            name='user_fullname'
                            onChange={handleInput}
                            className='form-control'
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
                            className='form-control'
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
                            className='form-control'
                        />
                        {errors.user_phonenum && <span className='text-danger'>{errors.user_phonenum}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong>Register</strong></button>
                    <Link to="/loginUser" className='btn btn-default w-100 mt-3'><strong>Login</strong></Link>
                </form>
            </div>
            <div className="logo-container">
                <img src={logo_large} alt="2Tor Logo" className="logo_large" />
            </div>
        </div>
    );
}
