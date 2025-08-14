import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Core Leaflet components for rendering the map and markers
import MarkerClusterGroup from 'react-leaflet-markercluster'; // Groups nearby markers into clickable clusters to reduce map clutter
import ZoomToService from './ZoomToService';
import CenterMapOnUser from './CenterMapOnUser';
import '../utils/leafletIconFix'; // Fixes marker icon issues in Vite
import { getDistance } from 'geolib'; // Calculates distance between two coordinates (used for nearby filtering)

// ServiceMap component displays a map with markers for services.
// Props:
// - services: an array of service objects.
// - selectedService: the currently selected service.
// - locateUser: a boolean indicating whether to center the map on the user's location.
// - setLocateUser: a function to update the locateUser state.
// - loading: a boolean indicating whether the map is loading.
// - setLoading: a function to update the loading state.

export default function ServiceMap({ services, selectedService, locateUser, setLocateUser, loading, setLoading }) {
  const [userCoords, setUserCoords] = useState(null);

  const defaultCenter = [51.505, -0.09]; //Fallback center for when user location is not available

  // Dynamically determines map center based on selected service or user's location
  // If a service is selected, centers on that service's location
  // If no service is selected but user location is available, centers on user location
  // If neither is available, centers on default location
  let center;
  if (selectedService && selectedService.coords) {
    center = selectedService.coords;
  } else if (userCoords) {
    center = userCoords;
  } else {
    center = defaultCenter;
  }

  let zoom = selectedService ? 16 : 13;

  // Trigger geolocation on button click
  const handleFindNearby = () => {
    setLoading(true);
    setLocateUser(true);
  };
    

  // Calculate distance (in meters) between user location and service location using geolib's getDistance function
  // Filter services within 10km if user location is available
  // If user location is not available, result is an empty array
  const nearbyServices = userCoords
    ? services.filter(service =>
        getDistance(
          { latitude: userCoords[0], longitude: userCoords[1] },
          { latitude: service.coords[0], longitude: service.coords[1] }
        ) < 10000
      )
    : [];

  // Decide which markers to show on the map
  // If user location is available, show only nearby services
  // If user location is not available, show all services
  let markersToShow = userCoords ? nearbyServices : services;

  // Ensure the selected service is always included in the list of map markers, even if it's not nearby.
  if (
    selectedService &&
    !markersToShow.some(service => service.id === selectedService.id) // Check if selected service is already in the list .some() checks if any service in the list matches the selected service by ID
  ) {
    markersToShow = [...markersToShow, selectedService]; // Add selected service to the list if it's not already included
  }

  return (
    <div className="relative h-full w-full">
      {/* Location button */}
      <button
        onClick={handleFindNearby}
        className="absolute top-4 right-4 z-[1000] bg-nhs-blue text-white px-2 py-2 rounded-md hover:bg-nhs-dark-blue transition-all shadow-md"
        aria-label="Find nearby services"
        disabled={loading} // Disable button while loading
      >
        {/* Location icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-[1500] pointer-events-none">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {/* Map rendering */}
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker clustering */}
        <MarkerClusterGroup>
          {markersToShow.map(service => (
            <Marker key={service.id} position={service.coords}>
              <Popup>
                <strong>{service.name}</strong><br />
                {service.address}<br />
                {service.postcode}<br />
                {service.phone && <><strong>Phone:</strong> {service.phone}<br /></>}
                {service.website && (
                  <>
                    <strong>Website:</strong>{' '}
                    <a
                      href={service.website.startsWith('http') ? service.website : `https://${service.website}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {service.website}
                    </a>
                  </>
                )}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        <ZoomToService selectedService={selectedService} />
        <CenterMapOnUser locateUser={locateUser} setLocateUser={setLocateUser} setUserCoords={setUserCoords} setLoading={setLoading} />
      </MapContainer>
    </div>
  );
}
