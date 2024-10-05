import React, { useState, useEffect } from 'react';
import UpdateTenantDetailsForm from './UpdateTenantDetailsForm ';
import apiClient from '../../utils/apiClient';

const TenantPropertyDetails = () => {
  const [isEditing, setIsEditing] = useState(false); 
  const [tenantDetails, setTenantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenantDetails = async () => {
      try {
        const response = await apiClient.get('/user/user-info');
        setTenantDetails(response.data);
      } catch (err) {
        setError('Failed to fetch tenant details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenantDetails();
  }, []);

  const handleUpdate = async (updatedDetails) => {
    try {
      const response = await apiClient.put(
        '/user/update-details',
        updatedDetails  
      );

      setTenantDetails((prevDetails) => ({
        ...prevDetails,
        ...updatedDetails,
      }));

      setIsEditing(false);
      alert('User details updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update user details');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!tenantDetails) {
    return <p>Tenant details not found.</p>;
  }

  const { user, tenantDetails: tenant } = tenantDetails;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* User Details */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Details</h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phoneNumber}</p>
      </div>
  
      <button
        onClick={() => setIsEditing(true)}
        className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Update
      </button>
  
      {isEditing && (
        <div className="mt-6">
          <UpdateTenantDetailsForm
            tenantDetails={tenantDetails}
            onUpdate={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}
  
      {/* Accommodation Details */}
      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Accommodation Details</h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>Accommodation Name:</strong> {tenant?.propertyName || 'N/A'}</p>
        <p><strong>Location:</strong> {tenant?.location || 'N/A'}</p>
        <p><strong>Price:</strong> R{tenant?.price  || '0'} /pm</p>
        <p><strong>Furnished:</strong> {tenant?.furnished ? 'Yes' : 'No'}</p>
      </div>
  
      {/* Lease Details */}
      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Lease Details</h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>Room Number:</strong> {tenant?.roomNumber  || 'N/A'}</p>
        <p><strong>Room Type:</strong> {tenant?.roomType  || 'N/A'}</p>
      </div>
  
      {/* Conditional component for cancel contract */}
      {/* tenant && <CancelContractRequest tenantId={tenant._id} /> */}
    </div>
  );
};

export default TenantPropertyDetails;
