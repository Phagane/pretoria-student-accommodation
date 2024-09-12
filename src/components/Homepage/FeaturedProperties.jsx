import React from 'react';
import { Link } from 'react-router-dom';
import properties from '../../data/properties.json'; 
const FeaturedProperties = () => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4 flex-grow flex flex-col relative">
                <h3 className="text-lg font-semibold mb-2">{property.name}</h3>
                <p className="text-gray-600 mb-2">{property.description}</p>
                <p className="font-semibold mb-2">{property.price}</p>

                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Gender: {property.gender}</span>
                </div>

                <p className="text-sm text-gray-500 mb-4">{property.furnished ? 'Furnished' : 'Unfurnished'}</p>
                <p className="text-sm text-gray-500 mb-4">Location: {property.location}</p>
                
                <Link to={`/property/${property.id}`}>
                  <button className="bg-violet-700 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  View Property
                </button>
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
