import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../requests/authRequests';
import './AuthStyles.css'; // Import CSS styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make API call for login
      const response = await loginApi({ username, password });
      console.log(response)
      login(username, response.role,response._id); // Use role from response
      navigate('/hotels'); // Redirect to hotels page after login
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
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
      <button onClick={handleLogin} className="auth-button">Login</button>
    </div>
  );
};

export default Login;
