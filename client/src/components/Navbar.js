import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import logo from '../Media/IMS LOGO.png'; // Ensure the logo path is correct

export default function Navbar(props) {
  const history = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post('http://localhost:5000/logout');
      history('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoClick = () => {
    history('/dashboard', { state: { id: props.name } });
  };

  return (
    <nav className="navbar custom-navbar">
      <div className="navbar-content">
        <div className="logo-container" onClick={handleLogoClick}>
          <img src={logo} alt="UT Logo" className="logo" />
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home" activeclassname="active">
              Orders
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/stock" activeclassname="active">
              Stocks
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/service" activeclassname="active">
              Service
            </NavLink>
          </li>
        </ul>
        <div className="user-section">
          <span className="user-name">{props.name}</span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAaN1bnmFRgMyxfVfuOU3-L9jI9dL4_d_RGhi321w&s"
            className="user-profile"
            alt="User Profile"
          />
          <button className="logout-button" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
