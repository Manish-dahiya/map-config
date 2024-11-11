"use client"
import { useState } from "react";
import LeafletMap from "./components/LeafletMap";

const Home=()=> {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markers, setMarkers] = useState([
    { latitude:30.7848005, longitude:76.923568}, // Example marker 1
    { latitude: 51.515, longitude: -0.1 },  // Example marker 2
  ]);

  // Handle the location selection and simulate storing it in the state
  const handleLocationSelected = (location) => {
    setSelectedLocation(location);
    console.log('Location Selected:', location);

    // Example: You can send this data to a backend API to store the location
    // fetch('/api/save-location', {
    //   method: 'POST',
    //   body: JSON.stringify(location),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  };

  return (
    <div>
      <h1>Leaflet Map in Next.js</h1>
      <p>
        Click on the map to select a location. Selected Location: {JSON.stringify(selectedLocation)}
      </p>
      <LeafletMap onLocationSelected={handleLocationSelected} markers={markers} />
    </div>
  );
};

export default Home;
