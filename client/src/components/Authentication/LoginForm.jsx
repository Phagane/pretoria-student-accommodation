import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault()

    try {

      const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/sign-in', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);


      if (response.data.status === 'success') {
        navigate('/');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Wrong username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value = {password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-violet-700 rounded-lg hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-600">
            Don't have an account? <a href="/signup" className="font-medium text-blue-600 hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;