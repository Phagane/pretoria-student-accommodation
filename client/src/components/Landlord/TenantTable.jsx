import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TenantTable = ({propertyId, onTenantRemoved}) => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/landlord/properties/${propertyId}/tenants`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTenants(response.data.tenants);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error loading tenant details');
        setLoading(false);
      }
    };

    fetchTenants();
  }, [propertyId]);

  const handleDelete = async (tenantId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/v1/landlord/properties/${propertyId}/tenants/${tenantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        onTenantRemoved(tenantId);
      }
    } catch (error) {
      console.error('Error deleting tenant:', error);
      alert('Failed to delete tenant. Please try again.');
    }
  };
  if (loading) return <div>Loading tenants...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-semibold mb-6">Tenants Information</h3>
  
      <table className="min-w-full bg-white border-collapse shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-6 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Name</th>
            <th className="py-3 px-6 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="py-3 px-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Phone No.</th>
            <th className="py-3 px-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Room No.</th>
            <th className="py-3 px-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Room Type</th>
            <th className="py-3 px-6 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Manage</th>
          </tr>
        </thead>
        <tbody>
          {tenants.length > 0 ? (
            tenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-gray-50">
                <td className="py-3 px-6 border-b border-gray-300 text-gray-800">{tenant.user.name}</td>
                <td className="py-3 px-6 border-b border-gray-300 text-gray-800">{tenant.user.email}</td>
                <td className="py-3 px-2 border-b border-gray-300 text-gray-800">{tenant.user.phoneNumber}</td>
                <td className="py-3 px-2 border-b border-gray-300 text-gray-800">{tenant.roomNumber}</td>
                <td className="py-3 px-2 border-b border-gray-300 text-gray-800 capitalize">{tenant.roomType}</td>
                <td className="py-3 px-6 border-b border-gray-300 text-gray-800">
                  <button
                    /* onClick={() => handleEdit(tenant.id)} */
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600 my-1"
                  >
                    Manage
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded"
                    onClick={() => handleDelete(tenant._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 px-6 text-center text-gray-500">No tenants found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
  
};

export default TenantTable;
