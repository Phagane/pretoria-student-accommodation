import React, { useState, useEffect } from 'react';
import apiClient from '../../utils/apiClient';

const TenantTable = ({ propertyId, onTenantRemoved }) => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await apiClient.get(`/landlord/properties/${propertyId}/tenants`);
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

  const handleEdit = (tenant) => {
    setSelectedTenant(tenant);
    setRoomNumber(tenant.roomNumber || '');
    setRoomType(tenant.roomType || 'sharing');
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await apiClient.put(
        `/landlord/properties/${propertyId}/tenants/${selectedTenant._id}`,
        { roomNumber, roomType },
      );
      if (response.status === 200) {
        setTenants((prevTenants) =>
          prevTenants.map((tenant) =>
            tenant._id === selectedTenant._id
              ? { ...tenant, roomNumber, roomType }
              : tenant
          )
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating tenant:', error);
      alert('Failed to update tenant. Please try again.');
    }
  };

  const handleDelete = async (tenantId) => {
    try {

      const isConfirmed = window.confirm("Are you sure you want to remove this tenant?");
  
      if (!isConfirmed) {
        return;
      }

      const response = await apiClient.delete(
        `/landlord/properties/${propertyId}/tenants/${tenantId}`,
      );
      if (response.status === 200) {
        onTenantRemoved(tenantId);
        setTenants((prevTenants) => prevTenants.filter((t) => t._id !== tenantId));
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
            <th className="py-3 px-6 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="py-3 px-6 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="py-3 px-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
              Phone No.
            </th>
            <th className="py-3 px-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
              Room No.
            </th>
            <th className="py-3 px-2 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
              Room Type
            </th>
            <th className="py-3 px-6 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
              Manage
            </th>
          </tr>
        </thead>
        <tbody>
          {tenants.length > 0 ? (
            tenants.map((tenant) => (
              <tr key={tenant._id} className="hover:bg-gray-50">
                <td className="py-3 px-6 border-b border-gray-300 text-gray-800">
                  {tenant.user.name}
                </td>
                <td className="py-3 px-6 border-b border-gray-300 text-gray-800">
                  {tenant.user.email}
                </td>
                <td className="py-3 px-2 border-b border-gray-300 text-gray-800">
                  {tenant.user.phoneNumber}
                </td>
                <td className="py-3 px-2 border-b border-gray-300 text-gray-800">
                  {tenant.roomNumber}
                </td>
                <td className="py-3 px-2 border-b border-gray-300 text-gray-800 capitalize">
                  {tenant.roomType}
                </td>
                <td className="py-3 px-6 border-b border-gray-300 text-gray-800">
                  <button
                    onClick={() => handleEdit(tenant)}
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
              <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                No tenants found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Edit Tenant Information</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Room Number</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Room Type</label>
              <select
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="single">Single</option>
                <option value="sharing">Sharing</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantTable;
