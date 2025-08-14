import { useEffect } from 'react';
import { useMap } from 'react-leaflet'; // Hook to access the Leaflet map instance

// CenterMapOnUser component centers the map on the user's current location when triggered.
// The 'locateUser' prop acts as a trigger: when true, this component requests the user's geolocation and recenters the map.
// After successfully centering, 'locateUser' is reset to false so the effect can be triggered again in the future if needed.

// Center the map on the user's current location
export default function CenterMapOnUser({ locateUser, setUserCoords, setLocateUser, setLoading }) {
    const map = useMap(); // Get access to the map instance

    useEffect(() => {
        // Only run if locateUser is true
        if (!locateUser) return; 

        // If geolocation is not supported by the browser
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            setLoading(false); // Stop any loading spinner
            setLocateUser(false); // Reset trigger
            return;
        }

        // Show loading spinner while locating
        setLoading(true);

        // Attempt to get user's current position
        // `navigator.geolocation` is the browser's built-in API to get the user's location.
        // `getCurrentPosition` asks for the current GPS location and calls the success or error callback accordingly.
        // Requires user permission to access location.
        navigator.geolocation.getCurrentPosition( 
            ({ coords: { latitude, longitude } }) => {
                const coords = [latitude, longitude];
                setUserCoords(coords);   // Save coordinates to state
                map.flyTo(coords, 13, { duration: 0.5 });   // fly and zoom to location

                setLocateUser(false); // Reset trigger so effect can be used again
                setLoading(false); // Reset loading state
            },
            (error) => {
                console.error('Geolocation error:', error);
                alert('Unable to retrieve your location.');
                setLocateUser(false);  // reset trigger even on error
            },
            {
                enableHighAccuracy: false,  // Faster, less accurate location
                timeout: 7000,              // 7 seconds max wait
                maximumAge: 60000           // Allow cached location up to 1 minute old
            }
        );
    }, [locateUser, map, setUserCoords, setLocateUser, setLoading]); // Only re-run if any of these dependencies change

    return null; // This component doesn’t render anything visually on the map
}

