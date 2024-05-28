import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from '../../LoginUserValidation';
import axios from 'axios';
import { toast } from 'react-toastify';
import './LoginUser.css'; // Import the CSS file
import logo_large from '../../../images/2TorLogo.png'

export default function LoginUser() {
    const [values, setValues] = useState({
        user_username: '',
        user_password: ''
    });
    const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
        if (errors.user_username === "" && errors.user_password === "") {
            axios.post('http://localhost:5000/loginuser', values)
                .then(res => {
                    if (res.data === "Success") {
                        sessionStorage.setItem('user', JSON.stringify(values)); // Store user data in session storage
                        console.log(values);
                        navigate('/MainUserMenu');
                        toast.success("Logged In Successfully");
                    } else {
                        toast.error("No Record existed");
                    }
                })
                .catch(err => console.log(err));
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
        <>
            <div className='login-container'>
            <div className="logo-container">
                <Link to='/'><img src={logo_large} alt="2Tor Logo" className="logo_large" /></Link>
            </div>
            <div className='login-box'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='user_username'><strong>Username</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Username'
                            onChange={handleInput}
                            className='form-control'
                            name='user_username'
                        />
                        {errors.user_username && <span className='text-danger'>{errors.user_username}</span>}
                    </div>
                    <div>
                        <label htmlFor='user_password'><strong>Password</strong></label>
                        <div className='password-container'>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder='Enter Password'
                                onChange={handleInput}
                                className='form-control'
                                name='user_password'
                            />
                            <button type='button' className='toggle-password' onClick={togglePasswordVisibility}>
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.user_password && <span className='text-danger'>{errors.user_password}</span>}
                    </div>
                    <button type="submit" className='btn btn-success w-100'><strong>Log In</strong></button>
                    <Link to="/RegisterUser" className='btn btn-default w-100 mt-3'><strong>New User</strong></Link>
                </form>
            </div>
        </div>
        </>
    );
}
