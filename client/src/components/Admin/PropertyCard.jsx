import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Rent:</strong> ${property.rent}</p>
      <p><strong>Description:</strong> {property.description}</p>
      <p><strong>Available Units:</strong> {property.availableUnits}</p>
      <p><strong>Date Added:</strong> {new Date(property.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default PropertyCard;
