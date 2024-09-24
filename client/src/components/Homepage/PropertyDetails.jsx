import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LandLordDetails from './LandlordDetails';
import ViewingRequestForm from './ViewingRequestForm'; 
import ApplyForAccommodationForm from './ApplyForAccommodationForm';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showViewingForm, setShowViewingForm] = useState(false); 
  const [showApplicationForm, setShowApplicationForm] = useState(false); 

  useEffect(() => {
    // Fetch property details from the backend
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/user/property/${id}`);
        setProperty(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching property');
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Render "property not found" if property is null
  if (!property) {
    return <p className="text-center text-red-500">Property not found.</p>;
  }
  /* const images = [
    property.image,
    property.image2,
    property.image3,
    property.image4,
    property.image5,
  ];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }; */

  const toggleViewingForm = () => {
    setShowViewingForm((prevShow) => !prevShow); 
  };

  const toggleApplicationForm = () => {
    setShowApplicationForm((prevShow) => !prevShow);
  };

  return (
    <div className="relative container mx-auto px-4 py-8">
      {showViewingForm && (
        <ViewingRequestForm onClose={toggleViewingForm} />
      )}
      {showApplicationForm && <ApplyForAccommodationForm onClose={toggleApplicationForm} />}

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-1">
        <div className="relative">
          {/* <img
            src={images[currentImageIndex]}
            alt={`${property.name} - ${currentImageIndex + 1}`}
            className="w-full h-80 object-cover"
          />
          <button
            onClick={handlePrevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-violet-700 text-white p-2 rounded-full"
          >
            &#8249;
          </button>
          <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-violet-700 text-white p-2 rounded-full"
          >
            &#8250;
          </button> */}
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{property.name}</h1>
          <div className="mt-1">
            <h1 className="text-gray-700">{property.description}</h1>
          </div>
          <p className="text-lg font-semibold mb-2 mt-1">Price: R{property.price}</p>
          <p className="text-gray-500 mb-2">Room Type: {property.occupancyType}</p>
          <p className="text-gray-500 mb-2">Gender: {property.genderAllowed}</p>
          <p className="text-gray-500 mb-2">Furnished: {property.furnished ? 'Yes' : 'No'}</p>
          <p className="text-gray-500 mb-2">Location: {property.location}</p>

          <button
            onClick={toggleApplicationForm}
            className="bg-violet-700 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2 ml-2"
          >
            Apply For Accommodation
          </button>
          <button
            onClick={toggleViewingForm}
            className="bg-violet-700 text-white py-2 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2 ml-2"
          >
            Request to View
          </button>
        </div>
      </div>
      <LandLordDetails agent={property.agent} />
    </div>
  );
};

export default PropertyDetails;
