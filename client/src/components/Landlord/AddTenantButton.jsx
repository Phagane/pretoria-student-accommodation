import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


const AddTenantButton = ({ propertyId, onTenantAdded }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tenantData, setTenantData] = useState({
    email: '',
    roomNumber: '',
    roomType: 'sharing',
  });
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenantData({ ...tenantData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/v1/landlord/add-tenant/${propertyId}`, tenantData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onTenantAdded(); // Refresh tenant list after adding a new tenant
      setIsFormOpen(false); // Close the form after submission
      setTenantData({ email: '', roomNumber: '', roomType: 'other' }); // Reset the form
      navigate(`/properties/${propertyId}`)
    } catch (error) {
      console.error('Error adding tenant:', error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="bg-blue-600 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-700"
      >
        {isFormOpen ? 'Cancel' : 'Add Tenant'}
      </button>

      {isFormOpen && (
        <form onSubmit={handleFormSubmit} className="mt-4 bg-white shadow-md p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={tenantData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="roomNumber">Room Number</label>
            <input
              id="roomNumber"
              name="roomNumber"
              value={tenantData.roomNumber}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="occupationType">Room Type</label>
            <select
              id="roomType"
              name="roomType"
              value={tenantData.roomType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="sharing">Sharing</option>
              <option value="single">Single</option>
            </select>
          </div>

          <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddTenantButton;
