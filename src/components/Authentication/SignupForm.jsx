import React, { useState } from 'react';

const SignupForm = () => {
  const [userType, setUserType] = useState('tenant');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Confirm password"
            />
          </div>
          <div>
            <label htmlFor="userType" className="block text-sm font-medium text-gray-600">Sign Up As</label>
            <select
              id="userType"
              value={userType}
              onChange={handleUserTypeChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-violet-700 rounded-lg hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
          <p className="text-sm text-center text-gray-600">
            Already have an account? <a href="/signin" className="font-medium text-blue-600 hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
