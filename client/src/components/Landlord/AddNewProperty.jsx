import React, { useState } from 'react';
import axios from 'axios';

const AddPropertyForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    location: '',
    furnished: false,
    genderAllowed: 'any', // Default gender option
    occupancyType: 'single', // Default occupancy type
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage

      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/landlord/addProperty',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setLoading(false);
      onSubmit(response.data.property); // Call parent method if provided

      // Optionally, reset form after success
      setFormData({
        name: '',
        description: '',
        price: '',
        location: '',
        furnished: false,
        genderAllowed: 'any',
        occupancyType: 'single',
        image: '',
      });
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Error adding property');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Property</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 mb-4">Property added successfully!</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Furnished</label>
          <input
            type="checkbox"
            name="furnished"
            checked={formData.furnished}
            onChange={handleChange}
          />{' '}
          Yes
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Gender Allowed Radio Buttons */}
        <div className="mb-4">
          <label className="block text-gray-700">Gender Allowed</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="genderAllowed"
                value="female"
                checked={formData.genderAllowed === 'female'}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="genderAllowed"
                value="male"
                checked={formData.genderAllowed === 'male'}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="genderAllowed"
                value="any"
                checked={formData.genderAllowed === 'any'}
                onChange={handleChange}
                className="mr-2"
              />
              Any
            </label>
          </div>
        </div>

        {/* Occupancy Type Radio Buttons */}
        <div className="mb-4">
          <label className="block text-gray-700">Occupancy Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="occupancyType"
                value="single"
                checked={formData.occupancyType === 'single'}
                onChange={handleChange}
                className="mr-2"
              />
              Single
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="occupancyType"
                value="sharing"
                checked={formData.occupancyType === 'sharing'}
                onChange={handleChange}
                className="mr-2"
              />
              Sharing
            </label>
          </div>
        </div>

        {/* Submit/Cancel Buttons */}
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-violet-700 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyForm;
