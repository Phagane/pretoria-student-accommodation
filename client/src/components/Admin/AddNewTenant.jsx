import React, { useState } from 'react';

const AddNewTenant = ({ onClose, onAddTenant }) => {
  const [tenantDetails, setTenantDetails] = useState({
    name: '',
    email: '',
    phone: '',
    roomNumber: '',
    roomType: '',
    leaseStartDate: '',
    leaseEndDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenantDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTenant(tenantDetails); 
    onClose(); 
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add New Tenant</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 pr-80" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={tenantDetails.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={tenantDetails.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={tenantDetails.phone}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomNumber">
            Room Number
          </label>
          <input
            id="roomNumber"
            name="roomNumber"
            type="text"
            value={tenantDetails.roomNumber}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomType">
            Room Type
          </label>
          <input
            id="roomType"
            name="roomType"
            type="text"
            value={tenantDetails.roomType}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaseStartDate">
            Lease Start Date
          </label>
          <input
            id="leaseStartDate"
            name="leaseStartDate"
            type="date"
            value={tenantDetails.leaseStartDate}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaseEndDate">
            Lease End Date
          </label>
          <input
            id="leaseEndDate"
            name="leaseEndDate"
            type="date"
            value={tenantDetails.leaseEndDate}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-violet-700 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Tenant
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewTenant;
