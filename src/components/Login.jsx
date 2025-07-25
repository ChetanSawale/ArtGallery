// src/components/Login.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// ✨ Accept onLoginSuccess prop
export default function Login({ isDarkMode, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate getting a user name from the email
    const nameFromEmail = email.split('@')[0]
      .replace(/[._]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    const fakeUser = {
      name: nameFromEmail || "Art Lover",
      email: email,
    };

    // ✨ Update the user state in App.jsx
    onLoginSuccess(fakeUser);

    // ✨ Show success toast and redirect
    toast.success(`Welcome back, ${fakeUser.name}!`);
    navigate('/');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
      <div className={`p-8 rounded-lg shadow-lg w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-3xl font-bold text-center mb-6">Login to ARTIQUE</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
            <input
              type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            />
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            />
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-indigo-500 hover:text-indigo-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}