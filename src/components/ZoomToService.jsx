import { useEffect } from 'react';
import { useMap } from 'react-leaflet'; // Hook to access the Leaflet map instance

// ZoomToService component zooms the map to the selected service's location
// Props:
// - selectedService: the currently selected service.

// Zoom to the selected service on the map
export default function ZoomToService({ selectedService }) {
    const map = useMap(); // Access the Leaflet map instance

    useEffect(() => {
        // If a service is selected and has coordinates, zoom to it
        if (selectedService && selectedService.coords) {
            map.setView(selectedService.coords, 16); // Set the map view to the selected location with zoom level 16
        }
    }, [selectedService, map]);

    return null; // This component doesn’t render anything visually on the map
}
