import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from '../../RegisterEducatorValidation'; // assuming you have a validation file for educators
import axios from 'axios';
import { toast } from 'react-toastify';
import './RegisterEducator.css'; // Import the CSS file
import logo_large from '../../../images/2TorLogo.png';

export default function RegisterEducator() {
    const [values, setValues] = useState({
        educator_username: '',
        educator_password: '',
        educator_fullname: '',
        educator_email: '',
        educator_phonenum: '',
        subjects_taught: [],
        newSubject: ''
    });
    const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const addSubject = () => {
        if (values.newSubject.trim() !== '') {
            setValues(prev => ({
                ...prev,
                subjects_taught: [...prev.subjects_taught, prev.newSubject],
                newSubject: ''
            }));
        }
    };

    useEffect(() => {
        const registerEducator = async () => {
            try {
                const res = await axios.post('http://localhost:5000/registereducator', values); // assuming the endpoint is registereducator
                toast.success("Registration Successful"); // Display success message
                navigate('/loginEducator');
            } catch (err) {
                console.log(err);
                toast.error("Registration Failed"); // Display error message
                if (err.response && err.response.status === 400 && err.response.data && err.response.data.error) {
                    toast.error(err.response.data.error); // Display error message for existing educator
                }
            }
        };

        // Check errors state after it's updated
        if (
            errors.educator_username === "" &&
            errors.educator_fullname === "" &&
            errors.educator_password === "" &&
            errors.educator_email === "" &&
            errors.educator_phonenum === ""
        ) {
            registerEducator();
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
        <div className='register-container'>
            <div className='register-box'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='educator_username'><strong>Username</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Username'
                            name='educator_username'
                            onChange={handleInput}
                            className='form-control'
                        />
                        {errors.educator_username && <span className='text-danger'>{errors.educator_username}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='educator_password'><strong>Password</strong></label>
                        <div className='password-container'>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder='Enter Password'
                                name='educator_password'
                                onChange={handleInput}
                                className='form-control'
                            />
                            <button type='button' className='toggle-password' onClick={togglePasswordVisibility}>
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.educator_password && <span className='text-danger'>{errors.educator_password}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='educator_fullname'><strong>Full Name</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Full Name'
                            name='educator_fullname'
                            onChange={handleInput}
                            className='form-control'
                        />
                        {errors.educator_fullname && <span className='text-danger'>{errors.educator_fullname}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='educator_email'><strong>Email</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Email'
                            name='educator_email'
                            onChange={handleInput}
                            className='form-control'
                        />
                        {errors.educator_email && <span className='text-danger'>{errors.educator_email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='educator_phonenum'><strong>Phone Number</strong></label>
                        <input
                            type='text'
                            placeholder='Enter Phone Number'
                            name='educator_phonenum'
                            onChange={handleInput}
                            className='form-control'
                        />
                        {errors.educator_phonenum && <span className='text-danger'>{errors.educator_phonenum}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='subjects_taught'><strong>Subjects Taught</strong></label>
                        <div className="d-flex">
                            <input
                                type='text'
                                placeholder='Enter Subject'
                                name='newSubject'
                                value={values.newSubject}
                                onChange={handleInput}
                                className='form-control'
                            />
                            <button type="button" onClick={addSubject} className="btn btn-primary ms-2">Add Subject</button>
                        </div>
                        {values.subjects_taught.map((subject, index) => (
                            <div key={index} className="mt-2">
                                {subject}
                            </div>
                        ))}
                    </div>
                    <button type='submit' className='btn btn-success w-100'><strong>Register</strong></button>
                    <Link to="/loginEducator" className='btn btn-default border w-100'><strong>Login</strong></Link>
                </form>
            </div>
            <div className="logo-container">
            <Link to='/'><img src={logo_large} alt="2Tor Logo" className="logo_large" /></Link>
            </div>
        </div>
    );
}
