import React, {useState} from 'react';
import tenants from '../../data/tenants.json'; 
import properties from '../../data/properties.json'; 
import UpdateAccommodation from './UpdateAccommodationForm';
import AddNewTenant from './AddNewTenant';

const ManageAccommodation = ({ propertyId, onClose }) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [tenantToRemove, setTenantToRemove] = useState(null); 

  const property = properties.find((p) => p.id === propertyId);
  const propertyTenants = tenants.filter((tenant) => tenant.propertyId === propertyId);

 
  const handleRemoveClick = (tenantId) => {
    setTenantToRemove(tenantId); 
  };

  const handleAddTenant = (newTenant) => {
    console.log("New Tenant:", newTenant);
  };

  const handleConfirmRemove = (tenantId) => {
    console.log(`Removing tenant with ID: ${tenantId}`);
    setTenantToRemove(null); 
  };

  const handleCancelRemove = () => {
    setTenantToRemove(null); 
  };

  if (!property) {
    return <p className="text-center text-red-500">Property not found.</p>;
  }

  return (
    <div className="relative container mx-auto px-4 py-4">
      {isUpdateOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <UpdateAccommodation propertyId={propertyId} onClose={() => setIsUpdateOpen(false)} />
          </div>
        </div>
      )}
      {isAddTenantOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <AddNewTenant onClose={() => setIsAddTenantOpen(false)} onAddTenant={handleAddTenant} />
          </div>
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-6 text-center">{property.name}</h2>
      <button
        onClick={onClose}
        className="bg-red-600 text-white py-2 mb-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Back to my properties
      </button>
      <button 
          onClick={() => setIsUpdateOpen(true)}
          className="bg-violet-700 ml-2 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2">
          Update {property.name}
        </button>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-2">Property Details</h3>
        <p className="text-gray-600 mb-2">{property.description}</p>
        <p className="font-bold mb-2">Price: {property.price}</p>
        <p className="text-gray-500 mb-2">Location: {property.location}</p>
        <p className="text-gray-500 mb-2">Furnished: {property.furnished ? 'Yes' : 'No'}</p>
        
      </div>
      <button 
          onClick={() => setIsAddTenantOpen(true)}
          className="bg-violet-700 mb-2 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2">
          Add new tenant
        </button>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-3 px-4 text-white border-b text-left">Tenant Name</th>
              <th className="py-3 px-4 text-white border-b text-left">Email</th>
              <th className="py-3 px-4 text-white border-b text-left">Phone</th>
              <th className="py-3 px-4 text-white border-b text-left">Room number</th>
              <th className="py-3 px-4 text-white border-b text-left">Room type</th>
              <th className="py-3 px-4 text-white border-b text-left">Lease Start Date</th>
              <th className="py-3 px-4 text-white border-b text-left">Lease End Date</th>
              <th className="py-3 px-4 text-white border-b text-left">Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {propertyTenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b">{tenant.name}</td>
                <td className="py-3 px-4 border-b">{tenant.email}</td>
                <td className="py-3 px-4 border-b">{tenant.phone}</td>
                <td className="py-3 px-4 border-b">{tenant.roomNumber}</td>
                <td className="py-3 px-4 border-b">{tenant.roomType}</td>
                <td className="py-3 px-4 border-b">{tenant.leaseStartDate}</td>
                <td className="py-3 px-4 border-b">{tenant.leaseEndDate}</td>
                <td className="py-3 px-4 border-b">
                  {tenantToRemove === tenant.id ? (
                    <div>
                      <p>Are you sure you want to remove tenant?</p>
                      <button
                        onClick={() => handleConfirmRemove(tenant.id)}
                        className="bg-red-600 text-white py-1 px-3 mr-2 rounded hover:bg-red-800"
                      >
                        Yes
                      </button>
                      <button
                        onClick={handleCancelRemove}
                        className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-700"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRemoveClick(tenant.id)}
                      className="bg-indigo-700 text-white py-1 px-3 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAccommodation;
