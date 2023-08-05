import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'
import { UserContext } from '../../state/UserContext';

const Signup = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, username, email, password }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        const loggedInUser = data.user;

        console.log('Signup successful');

        setUsername('');
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');

        updateUser(loggedInUser);

        navigate('/');
      } else {
        
        alert('Signup failed');
      }
    } catch (error) {
      alert('Signup failed: ' + error);
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
      <img className="signup-image" src="/src/assets/my-logo.png" alt="logo" />
        <h2 className='sign-up'>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="first_name">First Name:  </label>
          <input
            type="text"
            id="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name:  </label>
          <input
            type="text"
            id="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="email">Email:  </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className='signup-btn'>Sign Up</button>
        <p className='got-an-account'>
          Got an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;