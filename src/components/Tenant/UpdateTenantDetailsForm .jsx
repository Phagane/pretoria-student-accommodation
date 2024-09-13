import React, { useState } from 'react';

const UpdateTenantDetailsForm = ({ tenant, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: tenant.name,
    email: tenant.email,
    phone: tenant.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Updated tenant details:', formData);
    onUpdate(formData); // Call the onUpdate function with the updated data
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Update Your Details</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateTenantDetailsForm;
