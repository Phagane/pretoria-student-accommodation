import React, { useEffect, useRef } from 'react';

const MapComponent = ({ location }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Dynamically load the Google Maps script
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      document.head.appendChild(googleMapsScript);

      googleMapsScript.onload = () => {
        if (mapRef.current) {
          initializeMap();
        }
      };
    };

    // Call the function to load the script
    loadGoogleMapsScript();

    const initializeMap = () => {
      const { google } = window;

      // Ensure latitude and longitude are valid numbers
      const lat = parseFloat(location?.latitude || -25.74788035909332);
      const lng = parseFloat(location?.longitude || 28.11308313460712);

      // Validate that lat and lng are valid numbers
      if (isNaN(lat) || isNaN(lng)) {
        console.error('Invalid latitude or longitude');
        return;
      }

      // Set the position for the marker
      const position = { lat, lng };

      // Initialize the map
      const map = new google.maps.Map(mapRef.current, {
        center: position,
        zoom: 13,
      });

      // Add the marker using google.maps.Marker
      const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: "Property Location", // Title for the marker popup
      });

      // Optional: Add event listeners or extra customization to the marker
      marker.addListener('click', () => {
        alert('Marker clicked');
      });
    };

    // Clean up script on unmount
    return () => {
      const script = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (script) document.head.removeChild(script);
    };
  }, []);

  return (
    <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
  );
};

export default MapComponent;