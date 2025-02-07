import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../requests/authRequests';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make API call for login
      const response = await loginApi({ username, password });
      console.log(response);
      login(username, response.role, response._id); // Use role from response
      navigate('/hotels'); // Redirect to hotels page after login
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <button onClick={handleLogin} className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Login</button>
      </div>
    </div>
  );
};

export default Login;
