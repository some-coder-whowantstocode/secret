import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../requests/authRequests';
import './AuthStyles.css'; // Import CSS styles

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Make API call for signup
      await signupApi({ username, password, role });
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Signup</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="auth-input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="auth-input"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} className="auth-select">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSignup} className="auth-button">Signup</button>
    </div>
  );
};

export default Signup;
