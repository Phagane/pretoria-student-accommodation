import React, { useState } from 'react';
import axios from 'axios';

const ViewingRequestForm = ({ onClose, propertyId}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phoneNum: phoneNumber,
      date,
    };
    try {
     
      const response = await axios.post(`http://127.0.0.1:8000/api/v1/user/property/${propertyId}/request`, formData);
      console.log('Request submitted:', response.data);
      alert("Request Submitted")
      onClose(); 
    } catch (error) {
      console.error('Error submitting application:', error);
    }

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &#x2715; {/* Close Icon */}
        </button>
        <h2 className="text-xl font-semibold mb-4">Request to View the Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 border-2 border-indigo-600 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 border-2 border-indigo-600 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full border-2 border-indigo-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Pick a Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border-black rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewingRequestForm;
