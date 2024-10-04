import React, { useEffect, useRef } from 'react';

const MapComponent = ({ location }) => {
  const mapRef = useRef(null);

  useEffect(() => {

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


    loadGoogleMapsScript();

    const initializeMap = () => {
      const { google } = window;

      const lat = parseFloat(location?.latitude?.toString().trim());
      const lng = parseFloat(location?.longitude?.toString().trim());

      console.log("Latitude:", lat);
      console.log("Longitude:", lng);

      if (isNaN(lat) || isNaN(lng)) {
        console.error('Invalid latitude or longitude');
        return;
      }

      const position = { lat, lng };

      const map = new google.maps.Map(mapRef.current, {
        center: position,
        zoom: 13,
      });

      const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: "Property Location", 
      });

      marker.addListener('click', () => {
        alert('Marker clicked');
      });
    };

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
