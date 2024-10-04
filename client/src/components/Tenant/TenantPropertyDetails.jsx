import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CancelContractRequest from './CancelContractRequest';
import UpdateTenantDetailsForm from './UpdateTenantDetailsForm ';


const TenantPropertyDetails = () => {
  const [isEditing, setIsEditing] = useState(false); 
  const [tenantDetails, setTenantDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenantDetails = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://127.0.0.1:8000/api/v1/user/user-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://127.0.0.1:8000/api/v1/user/update-details',
        updatedDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mt-6 mb-4">Your Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phoneNumber}</p>

      <button
        onClick={() => setIsEditing(true)}
        className="mt-4 bg-blue-600 text-white py-2 mb-1 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Update
      </button>

      {isEditing && (
        <UpdateTenantDetailsForm
          tenantDetails={tenantDetails}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}

      <h2 className="text-xl font-semibold mb-4">Accommodation Details</h2>
      <p><strong>Accommodation Name:</strong> {tenant?.propertyName}</p>
      <p><strong>Location:</strong> {tenant?.location}</p>
      <p><strong>Price:</strong> R{tenant?.price} /pm</p>
      <p><strong>Furnished:</strong> {tenant?.furnished ? 'Yes' : 'No'}</p>

      <h2 className="text-xl font-semibold mt-6 mb-4">Lease Details</h2>
      <p><strong>Room Number:</strong> {tenant?.roomNumber}</p>
      <p><strong>Room Type:</strong> {tenant?.roomType}</p>

{/*       {tenant && <CancelContractRequest tenantId={tenant._id} />}
 */}    </div>
  );
};

export default TenantPropertyDetails;
