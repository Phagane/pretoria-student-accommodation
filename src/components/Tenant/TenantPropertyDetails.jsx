import React, { useState } from 'react';
import CancelContractRequest from './CancelContractRequest';
import properties from '../../data/properties.json';
import tenants from '../../data/tenants.json';
import UpdateTenantDetailsForm from './UpdateTenantDetailsForm ';

const TenantPropertyDetails = ({ tenantId }) => {
  const [isEditing, setIsEditing] = useState(false); 
  const tenant = tenants.find((t) => t.id === tenantId);
  const property = properties.find((p) => p.id === tenant?.propertyId);

  const handleUpdate = (updatedDetails) => {
    console.log('Updated details from parent:', updatedDetails);
    setIsEditing(false); 
  };

  if (!tenant || !property) {
    return <p>Tenant or property details not found.</p>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Accommodation Details</h2>
      <p><strong>Accommodation Name:</strong> {property.name}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> {property.price}</p>
      <p><strong>Furnished:</strong> {property.furnished ? 'Yes' : 'No'}</p>

      <h2 className="text-xl font-semibold mt-6 mb-4">Your Details</h2>
      <p><strong>Name:</strong> {tenant.name}</p>
      <p><strong>Email:</strong> {tenant.email}</p>
      <p><strong>Phone:</strong> {tenant.phone}</p>

      <button
        onClick={() => setIsEditing(true)}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Update
      </button>

      {isEditing && (
        <UpdateTenantDetailsForm
          tenant={tenant}
          onUpdate={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}

      <h2 className="text-xl font-semibold mt-6 mb-4">Lease Details</h2>
      <p><strong>Room Number:</strong> {tenant.roomNumber}</p>
      <p><strong>Room Type:</strong> {tenant.roomType}</p>
      <p><strong>Lease Start Date:</strong> {tenant.leaseStartDate}</p>
      <p><strong>Lease End Date:</strong> {tenant.leaseEndDate}</p>
      {tenant && <CancelContractRequest tenantId={tenant.id} />}
    </div>
  );
};

export default TenantPropertyDetails;
