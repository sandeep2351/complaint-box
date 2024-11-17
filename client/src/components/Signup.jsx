import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/signup.css";
import Navbar from './Navbar';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      navigate('/login'); 
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Signup failed. Please try again.');
    }
  } catch (err) {
    console.error('Error during signup:', err);
    setError('An error occurred. Please try again.');
  }
};


  return (
    <>
      <Navbar />
      <div className="signup-container" style={{ marginTop: '80px' }}>
        <form onSubmit={handleSubmit} className="signup-form">
          <h2 style={{ textAlign: 'center', marginBottom: '10px', marginTop: '-10px', color: '#333' }}>
            Register
          </h2>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Submit</button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Signup;
