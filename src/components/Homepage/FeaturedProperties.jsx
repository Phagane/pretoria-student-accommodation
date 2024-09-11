import React from 'react';

const properties = [
  {
    id: 1,
    name: 'Dallas',
    image: 'Dallas.jpg',
    description: 'A beautiful apartment with lots of natural light, close to the university.',
    price: 'R2000/month',
    gender: 'Any',
    furnished: true,
    location: 'Downtown',
  },
  {
    id: 2,
    name: 'Kingsrow',
    image: 'Kingsrow.jpg',
    description: 'A small and cozy studio perfect for solo students.',
    price: 'R2500/month',
    gender: 'Female',
    furnished: false,
    location: 'Near University',
  },
  {
    id: 3,
    name: 'Nassau',
    image: 'Nassau.jpg',
    description: 'A shared house with a friendly atmosphere, close to public transport.',
    price: 'R2200/month',
    gender: 'Male',
    furnished: true,
    location: 'Suburb',
  },
  {
    id: 4,
    name: 'Monaco',
    image: 'Monaco.jpg',
    description: 'A luxury condo with great amenities, ideal for students looking for comfort.',
    price: 'R3000/month',
    gender: 'Any',
    furnished: true,
    location: 'City Center',
  },
  {
    id: 5,
    name: 'San Marino',
    image: 'san-marino.jpg',
    description: 'A dormitory with affordable prices, ideal for students on a budget.',
    price: 'R1150/month',
    gender: 'Any',
    furnished: false,
    location: 'Campus',
  },
  {
    id: 6,
    name: 'Arebeng',
    image: 'Arebeng2.jpg',
    description: 'A modern loft with open space, perfect for creative students.',
    price: 'R550/month',
    gender: 'Female',
    furnished: true,
    location: 'Midtown',
  },
];

const FeaturedProperties = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl text-white font-semibold text-center mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              {/* Property Image */}
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover"
              />
              
              {/* Property Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{property.name}</h3>
                <p className="text-gray-600 mb-2">{property.description}</p>
                <p className="font-semibold mb-2">{property.price}</p>

                {/* Gender and Furnished Details */}
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Gender: {property.gender}</span>
                  <span>{property.furnished ? 'Furnished' : 'Unfurnished'}</span>
                </div>

                {/* Location */}
                <p className="text-sm text-gray-500 mb-4">Location: {property.location}</p>

                {/* Read More Button */}
                <button className="bg-indigo-600 text-white py-1 px-4 rounded-md hover:bg-indigo-700">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
