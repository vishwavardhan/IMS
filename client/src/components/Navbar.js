// D:\IMS\client\src\components\Navbar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../Media/IMS LOGO.png';
import './Navbar.css';

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
    history('/home', { state: { id: props.name } });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-brand mt-2 mt-lg-0" style={{ margin: '0 -40px' }}>
              <img
                src={logo}
                height={50}
                alt="UT Logo"
                onClick={handleLogoClick}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/home"
                  onClick={handleLogoClick}
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/orders" activeClassName="active">
                  Manage Orders
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/stock" activeClassName="active">
                  Manage Stock
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard" activeClassName="active">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/services" activeClassName="active">
                  Services
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <span className="mx-2">{props.name}</span>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAaN1bnmFRgMyxfVfuOU3-L9jI9dL4_d_RGhi321w&s"
                className="rounded-circle"
                height={35}
                alt="User Profile"
              />
              <button className="btn btn-primary mx-4" onClick={handleLogOut}>
                Log Out
              </button>
            </div>
          </div>    
        </div>
      </nav>
    </>
  );
}
