import React from 'react';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import './NavigationMainScreenEducator.css';
import logo_small from '../../../images/2TorLogo.png';

export default function NavigationMainScreenEducator() {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div className="navigation-main-screen">
            <div className="logo-container">
            <Link to='/MainEducatorMenu'><img src={logo_small} alt="2Tor Logo" className="logo-small" /></Link>
            </div>
            <nav className="navbar">
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/EducatorProfile" className="nav-link">
                            Profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}