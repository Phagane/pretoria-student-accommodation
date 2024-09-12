import React from 'react';
import { useParams, Link } from 'react-router-dom';
import properties from '../../data/properties.json'; 

const PropertyDetails = () => {
  const { id } = useParams(); 
  const property = properties.find((p) => p.id === parseInt(id)); 

  if (!property) {
    return <p className="text-center text-red-500">Property not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-1">
        <img src={property.image} alt={property.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{property.name}</h1>
          <div className="mt-1">
            <p className="text-gray-700">{property.details}</p>
          </div>
          <p className="text-lg font-semibold mb-2 mt-1">Price: {property.price}</p>
          <p className="text-gray-500 mb-2">Gender: {property.gender}</p>
          <p className="text-gray-500 mb-2">Furnished: {property.furnished ? 'Yes' : 'No'}</p>
          <p className="text-gray-500 mb-2">Location: {property.location}</p>
          
          <Link to={`/property/${property.id}`}>
                  <button className="bg-violet-700 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2">
                  Apply for Accommodation
                </button>
          </Link>
          <Link to={`/property/${property.id}`}>
                  <button className="bg-violet-700 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2 ml-2">
                  Request to View
                </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
