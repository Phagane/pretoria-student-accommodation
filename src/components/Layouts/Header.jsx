
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
          <a href="/"className="font-semibold text-xl text-gray-800">Pretoria Student Accommodations</a>
        </div>
        
        <nav className="flex items-center space-x-6">
          <a href="/properties" className="text-gray-600 hover:text-gray-800">
            Properties
          </a>
          <a href="/about" className="text-gray-600 hover:text-gray-800">
            About Us
          </a>
          <a href="/login" className="text-gray-600 hover:text-gray-800">
            Login
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
