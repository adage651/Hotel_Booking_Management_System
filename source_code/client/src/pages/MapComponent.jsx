import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
const MapComponent = () => {
  const mapContainerRef = useRef(1);
  let map=null
  useEffect(() => {
  if(map){
    map.off()
    map.remove()
  }
    if (!mapContainerRef.current) return;

   map= L.map(mapContainerRef.current).setView([8.2824812,37.7750159], 13); // Set initial view (replace with default location if needed)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 25,
    }).addTo(map);
    const greenIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png', // Example icon URL (replace with desired icon)
  iconSize: [25, 41], // Size of the icon image
  iconAnchor: [12, 41], // Point of the icon that corresponds to the marker position
  popupAnchor: [1, -34], // Point from which popups should open relative to the icon
});

    const marker = L.marker([8.2824812,37.7750159], {
  icon: greenIcon, // Set a custom icon image
  title: 'Yejoka Hotel', // Add a title displayed on hover
}).addTo(map);

    const getUserLocation = async () => {
      if (navigator.geolocation) {
        try {
          const position = await navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude: lat, longitude: lon } = position.coords;
              const currentUserLocation = [lat, lon];

              map.setView(currentUserLocation, 13); // Center on user's location

              const endPoint = [8.2824812,37.7750159]; // Example end point (Los Angeles)

              L.Routing.control({
                waypoints: [
                  L.latLng(currentUserLocation),
                  L.latLng(endPoint),
                ],
                serviceUrl: 'https://router.project-osrm.org/route/v1',
              }).addTo(map);
            },
            (error) => {
              console.error('Error getting geolocation:', error);
              // Handle geolocation error gracefully (e.g., display user-friendly message)
              // Possible options:
              // - Display a message indicating geolocation failed
              // - Allow manual location input
              // - Use a default map view
            }
          );
        } catch (error) {
          console.error('Error getting geolocation:', error);
          // Handle general errors during geolocation retrieval
        }
      } else {
        console.error('Geolocation is not supported by this browser.');
        // Handle the case where geolocation is not available
      }
    };

    getUserLocation();
    mapContainerRef.current==null;
  }, []); // Empty dependency array to prevent unnecessary re-renders

  return  (<Container id="AboutUs" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography style={{textAlign:'center',padding:'30px'}}  component="h2" variant="h4" color="text.primary">
              Track our Hotel Location
            </Typography>
               </div>
               </Grid>
                </Grid>
  <div id="map" ref={mapContainerRef} style={{ height: '400px' }} />
  </Container>)
};

export default MapComponent;
