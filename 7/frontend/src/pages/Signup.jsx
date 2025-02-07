import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../requests/authRequests';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Make API call for signup
      await signupApi({ username, password, role: "user" });
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Signup</h1>
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
        <button onClick={handleSignup} className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">Signup</button>
      </div>
    </div>
  );
};

export default Signup;
