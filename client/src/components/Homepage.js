// client/src/components/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import logo from '../Media/IMS LOGO.png'; // Ensure the logo path is correct

export default function Homepage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="homepage">
      <div className="overlay">
        <img src={logo} alt="UTStarcom Logo" className="logo" />
        <h1>Inventory Management System</h1>
        <div className="buttons">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
          <button className="btn btn-secondary" onClick={handleSignUp}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
