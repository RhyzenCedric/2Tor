import React from 'react';
import { Link } from 'react-router-dom';
import './TableSelection.css'; // Import the CSS file
import logo_large from '../../images/2TorLogo.png';

export default function TableSelection() {
    const handleMouseEnter = (e) => {
        const originalText = e.target.textContent;
        const hoverText = e.target.getAttribute('data-hover-text');
        e.target.setAttribute('data-original-text', originalText);
        e.target.textContent = hoverText;
    };

    const handleMouseLeave = (e) => {
        const originalText = e.target.getAttribute('data-original-text');
        e.target.textContent = originalText;
    };

    return (
        <div className="role-selection-container">
            <div className="logo-container">
            <Link to='/'><img src={logo_large} alt="2Tor Logo" className="logo_large" /></Link>
            </div>
            <div className="box-container">
                <div className="buttons-container">
                    <Link to="/UsersTable">
                        <button
                            className="role-button"
                            data-hover-text="Do you want to view all Users?"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Users
                        </button>
                    </Link>
                    <Link to="/EducatorsTable">
                        <button
                            className="role-button"
                            data-hover-text="Do you want to view all Educators?"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Educators
                        </button>
                    </Link>
                    <Link to="/">
                        <button
                            className="role-button"
                            data-hover-text="Return to Role Selection"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Return
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
