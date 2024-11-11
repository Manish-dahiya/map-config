// components/LeafletMap.js
"use client"
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from "../../../public/marker.png"
import Image from 'next/image';
import L from 'leaflet'; // Make sure to import L from Leaflet


const LeafletMap = ({ onLocationSelected, markers }) => {
  const [userMarker, setUserMarker] = useState(null);

  // This hook handles map click events and updates the state
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setUserMarker([lat, lng]); // Set the user's marker location
        onLocationSelected({ latitude: lat, longitude: lng }); // Pass the location to parent component
      },
    });
    return null;
  };

  const [locations,setLocation]= useState([{latitude:1323,longitude:1323}])
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        setLocation((prev) => {
            const updatedLocations = [...prev, { latitude: lat, longitude: long }];
           
            return updatedLocations;
          });   
      });
      
  },[])

  //icon for marker
  const customIcon = L.icon({
    iconUrl: "/marker.png", // Your custom image URL
    iconSize: [32, 32], // Adjust size as needed
    iconAnchor: [16, 32], // Anchor the icon to the bottom center
    popupAnchor: [0, -32], // Position the popup relative to the icon
  });

  return (
    <>
    <MapContainer
      center={[30.7848005, 76.923568]} // Set initial map center
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
      {/* Tile layer for the map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Handling map click events */}
      <MapClickHandler />

      {/* User marker */}
      {userMarker && (
        <Marker position={userMarker} icon={customIcon}>
          <Popup>Your selected location</Popup>
        </Marker>
      )}

      {/* Displaying any other markers passed from props */}
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.latitude, marker.longitude]} icon={customIcon}>
          <Popup>hiii</Popup>
          {/* <Image src={marker} alt="marker png" /> */}
        </Marker>
      ))}
    </MapContainer>
    {/* <Image src={markerIcon} alt='hii' /> */}
    </>
  );
};

export default LeafletMap;