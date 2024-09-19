import React, { useState } from 'react';

const ApplyForAccommodationForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fundingType, setFundingType] = useState('');
  const [roomType, setRoomType] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRoomType((prev) => [...prev, value]);
    } else {
      setRoomType((prev) => prev.filter((type) => type !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Application submitted with the following details:
    Name: ${name}, 
    Email: ${email}, 
    Phone Number: ${phoneNumber}, 
    Funding Type: ${fundingType}, 
    Room Type: ${roomType.join(', ')}`);
    
    onClose(); 
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
        <h2 className="text-xl font-semibold mb-4">Apply for Accommodation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mr-60 mt-1 block w-full border-2 border-indigo-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700">Funding Type</span>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="fundingType"
                  value="Funded by NSFAS"
                  onChange={(e) => setFundingType(e.target.value)}
                  className="form-radio text-indigo-600"
                  required
                />
                <span className="ml-2">Funded by NSFAS</span>
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="fundingType"
                  value="Private Bursary"
                  onChange={(e) => setFundingType(e.target.value)}
                  className="form-radio text-indigo-600"
                  required
                />
                <span className="ml-2">Private Bursary</span>
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="fundingType"
                  value="Self funded"
                  onChange={(e) => setFundingType(e.target.value)}
                  className="form-radio text-indigo-600"
                  required
                />
                <span className="ml-2">Self funded</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700">Room Type</span>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="roomType"
                  value="Single room"
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2">Single room</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="checkbox"
                  name="roomType"
                  value="Sharing room"
                  onChange={handleCheckboxChange}
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2">Sharing room</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForAccommodationForm;
