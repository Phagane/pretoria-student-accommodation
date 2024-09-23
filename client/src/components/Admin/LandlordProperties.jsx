import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPropertyForm from './AddNewProperty';
import PropertyCard from './PropertyCard'; 

const LandlordProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddPropertyForm, setShowAddPropertyForm] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://127.0.0.1:8000/api/v1/landlord/properties', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProperties(response.data.properties); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error loading properties');
        setLoading(false); 
      }
    };

    fetchProperties();
  }, []);

  const handleAddNewPropertyClick = () => {
    setShowAddPropertyForm(true);
  };

  const handleAddPropertyCancel = () => {
    setShowAddPropertyForm(false);
  };

  const handleAddPropertySubmit = (newProperty) => {
    setProperties([...properties, newProperty]); 
    setShowAddPropertyForm(false); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Manage Your Properties</h2>
      <button
        className="bg-violet-700 my-2 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2"
        onClick={handleAddNewPropertyClick}
      >
        Add New Property
      </button>

      {showAddPropertyForm && (
        <AddPropertyForm 
        onSubmit={handleAddPropertySubmit} 
        onCancel={handleAddPropertyCancel} />
      )}

      <div className="mt-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} /> 
          ))
        ) : (
          <p className="text-center">No properties found. Add your first property!</p>
        )}
      </div>
    </div>
  );
};

export default LandlordProperties;
