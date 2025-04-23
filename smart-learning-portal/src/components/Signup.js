import React from 'react';

const Signup = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Sign Up</h2>
    <form>
      <input type="text" placeholder="First Name" /><br />
      <input type="text" placeholder="Last Name" /><br />
      <select>
        <option value="" disabled selected>Select Role</option>
        <option value="Student">Student</option>
        <option value="Instructor">Instructor</option>
        <option value="Admin">Admin</option>
      </select><br/>
      <input type="email" placeholder="Email" /><br />
      <input type="password" placeholder="Password" /><br />
      <button type="submit">Sign Up</button>
    </form>
  </div>
);

export default Signup;
