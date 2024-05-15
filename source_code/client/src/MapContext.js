import React, { createContext, useState, useEffect } from 'react';

const MapContext = createContext(null);

const MapProvider = ({ children }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapContainer = document.getElementById('map'); // Assuming map container ID
    if (!mapContainer) return;

    const mapInstance = L.map(mapContainer).setView([0, 0], 13); // Set initial view

    // Add your tile layer and other map initialization code here
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapInstance);

    setMap(mapInstance); // Set the map instance in the context
  }, []);

  return <MapContext.Provider value={{ map }}>{children}</MapContext.Provider>;
};

export { MapContext, MapProvider };
