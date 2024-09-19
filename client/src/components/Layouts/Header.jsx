import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="./real-estate-logo.png"
            alt="App Logo"
            className="h-20 w-20 mr-2"
          />
          <a href="/" className="font-semibold text-xl text-gray-800">
            Pretoria Student Accommodations
          </a>
        </div>
        
        <nav className="flex items-center space-x-6">
          <a href="/" className="text-gray-600 hover:text-gray-800">
            Home
          </a>
          <a href="/student-needs" className="text-gray-600 hover:text-gray-800">
            Student Needs
          </a>
          <a href="/properties" className="text-gray-600 hover:text-gray-800">
            Properties
          </a>
          <a href="/about" className="text-gray-600 hover:text-gray-800">
            About Us
          </a>
          
          <a href="/notifications" className="relative text-gray-600 hover:text-gray-800">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"></path>
            </svg>
            
            <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </a>

          <a href="/signin" className="text-gray-600 hover:text-gray-800">
            Login
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
