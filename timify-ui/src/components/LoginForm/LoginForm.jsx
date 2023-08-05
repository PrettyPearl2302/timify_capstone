import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../state/UserContext';
import './LoginForm.css'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        const loggedInUser = data.user;

        updateUser(loggedInUser);

        navigate('/');
      } else {

        alert('Login failed');
      }
    } catch (error) {
        
      alert('Login failed: ' + error);
    }
  };

  return (
    <div className='login-form-container'>
      <form className="login-form" onSubmit={handleLogin}>
      <img className="login-image" src="/src/assets/my-logo.png" alt="logo" />
        <h2 className='login-header'>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:  </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:  </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='login-btn'>Login</button>
        <p className='new-here'>
         New here? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;