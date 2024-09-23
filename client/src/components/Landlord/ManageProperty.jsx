import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ManageProperty = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { propertyId } = useParams();


  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/landlord/properties/${propertyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperty(response.data.property);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error loading property details');
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Manage {property.name}</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-2">Property Details</h3>
        <p className="text-gray-600 mb-2">{property.description}</p>
        <p className="font-bold mb-2">Price: {property.price}</p>
        <p className="text-gray-500 mb-2">Location: {property.location}</p>
        <p className="text-gray-500 mb-2">Furnished: {property.furnished ? 'Yes' : 'No'}</p>
      </div>
      {/* Additional management options can go here */}
    </div>
  );
};

export default ManageProperty;
