import React from 'react';
import { Link } from 'react-router-dom';
import logo_large from '../images/2TorLogo.png';
import './RoleSelection.css'; // Import the CSS file

export default function RoleSelection() {
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
        <img src={logo_large} alt="2Tor Logo" className="logo_large" />
      </div>
      <div className="box-container">
        <div className="buttons-container">
          <Link to="/loginUser">
            <button 
              className="role-button" 
              data-hover-text="Are you a User?"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              User
            </button>
          </Link>
          <Link to="/loginEducator">
            <button 
              className="role-button" 
              data-hover-text="Are you an Educator?"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Educator
            </button>
          </Link>
          <Link to="/TableSelection">
            <button 
              className="role-button" 
              data-hover-text="Or are you an Admin?"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
