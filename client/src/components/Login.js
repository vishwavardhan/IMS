import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import logo from '../Media/IMS LOGO.png'; // Correct path to the image

const Login = () => {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/login", { email, password })
        .then(res => {
          if (res.data.status) {
            history("/home", { state: { id: res.data.name } });
          } else {
            alert("Email doesn't exist! Please Sign-Up");
          }
        })
        .catch(e => {
          alert("Error");
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="UTStarcom" className="logo" />
        <h2>Login</h2>
        <form onSubmit={submit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
