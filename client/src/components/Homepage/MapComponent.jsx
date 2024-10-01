import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customMarkerIcon from './location3.png'

// Define custom icon
const customIcon = L.icon({
  iconUrl: customMarkerIcon, 
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32], 
});

const MapComponent = ({ location }) => {
  const defaultPosition = [-25.74788035909332, 28.11308313460712]; 

  return (
    <div style={{ height: '400px', width: '100%', marginTop: '20px', paddingRight:'20px', paddingLeft:'25px' }}>
      <MapContainer center={defaultPosition} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={defaultPosition} icon={customIcon}>
          <Popup>Property Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
