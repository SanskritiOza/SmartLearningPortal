import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Welcome to Smart Learning Portal</h1>
    <p>Start your journey to smarter learning!</p>
    <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
  </div>
);

export default Landing;
