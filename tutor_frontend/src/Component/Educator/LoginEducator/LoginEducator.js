import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from '../../LoginEducatorValidation'; // Adjusted validation function import
import axios from 'axios';
import { toast } from 'react-toastify';
import './LoginEducator.css'; // Import the CSS file
import logo_large from '../../../images/2TorLogo.png'

export default function LoginEducator() {
    const [values, setValues] = useState({
        educator_username: '',
        educator_password: ''
    });
    const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
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
                        sessionStorage.setItem('educator', JSON.stringify(values));
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

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    return (
        <div className='login-container'>
            <div className="logo-container">
                <img src={logo_large} alt="2Tor Logo" className="logo_large" />
            </div>
            <div className='login-box'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='educator_username'><strong>Username</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Username'
                            onChange={handleInput}
                            className={`form-control ${errors.educator_username ? 'is-invalid' : ''}`}
                            name='educator_username' // Adjusted name attribute
                        />
                        {errors.educator_username && <span className='text-danger'>{errors.educator_username}</span>}
                    </div>
                    <div>
                        <label htmlFor='educator_password'><strong>Password</strong></label>
                        <div className='password-container'>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder='Enter Password'
                                onChange={handleInput}
                                className={`form-control ${errors.educator_password ? 'is-invalid' : ''}`}
                                name='educator_password' // Adjusted name attribute
                            />
                            <button type='button' className='toggle-password' onClick={togglePasswordVisibility}>
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.educator_password && <span className='text-danger'>{errors.educator_password}</span>}
                    </div>
                    <button type="submit" className='btn btn-success w-100'><strong>Log In</strong></button>
                    <Link to="/RegisterEducator" className='btn btn-default w-100 mt-3'><strong>New Educator</strong></Link>
                </form>
            </div>
        </div>
    );
}
