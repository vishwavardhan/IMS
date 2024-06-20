// client/src/components/Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Assuming you have a CSS file for styling

const Homepage = () => {
  return (
    <div className="homepage">
      <h1>UTSTARCOM Inventory Management System</h1>
      <p>Effectively track and manage your inventory, including incoming and outgoing stock, stock levels, and stock movement.</p>
      <div className="buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>
    </div>
  );
}

export default Homepage;
