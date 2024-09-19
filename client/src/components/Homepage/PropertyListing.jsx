import React from 'react';
import PropertyCard
 from './PropertyCard';

const ProperyListing = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default ProperyListing;