import React, { useState } from 'react';
import properties from '../../data/properties.json'; 
const UpdateAccommodation = ({ propertyId, onClose }) => {
  const property = properties.find((p) => p.id === propertyId);

  const [name, setName] = useState(property.name);
  const [description, setDescription] = useState(property.description);
  const [price, setPrice] = useState(property.price);
  const [location, setLocation] = useState(property.location);
  const [furnished, setFurnished] = useState(property.furnished);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      id: propertyId,
      name,
      description,
      price,
      location,
      furnished,
    });

    onClose();
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white  rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm pr-80 font-medium text-gray-700">Property Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Furnished</label>
          <select
            value={furnished}
            onChange={(e) => setFurnished(e.target.value === 'true')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-violet-700 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccommodation;
