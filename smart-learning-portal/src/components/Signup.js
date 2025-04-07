import React from 'react';

const Signup = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Sign Up</h2>
    <form>
      <input type="text" placeholder="Name" /><br />
      <input type="email" placeholder="Email" /><br />
      <input type="password" placeholder="Password" /><br />
      <button type="submit">Sign Up</button>
    </form>
  </div>
);

export default Signup;
