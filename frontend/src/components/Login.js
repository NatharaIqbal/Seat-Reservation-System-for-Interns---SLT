import React, { useState } from 'react';
import API from '../services/api';

const Login = ({ setAuth, setAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await API.post('/users/login', { email, password });
      const { token, data } = response.data;
      localStorage.setItem(data.isAdmin ? 'adminToken' : 'userToken', token);
      setAuth(true);
      setAdmin(data.isAdmin);
      window.location.href = data.isAdmin ? '/admin-dashboard' : '/intern-dashboard';
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold text-darkBlue mb-4">Login</h2>
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
          required
        />
      </div>
      <button
        onClick={handleLogin}
        className="w-full bg-primaryBlue text-white p-2 rounded hover:bg-darkBlue"
      >
        Login
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
      <p className="mt-2 text-darkBlue">
        Don't have an account? <a href="/signup" className="text-secondaryGreen">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;