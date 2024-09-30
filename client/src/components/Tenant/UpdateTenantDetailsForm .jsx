import React, { useState } from 'react';

const UpdateTenantDetailsForm = ({ tenantDetails, onUpdate, onCancel }) => {
  const [name, setName] = useState(tenantDetails.name || '');
  const [email, setEmail] = useState(tenantDetails.email || '');
  const [phoneNumber, setPhoneNumber] = useState(tenantDetails.phoneNumber || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ name, email, phoneNumber });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>

      <div className="mt-4">
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Save
        </button>
        <button type="button" onClick={onCancel} className="ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateTenantDetailsForm;
