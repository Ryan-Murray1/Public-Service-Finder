// Takes in the raw JSON data
export default function transformJson(json) {
    return json.features
        .map(feature => {

            const properties = feature.properties; // Access nested properties from each service
            const coords = feature.geometry?.coordinates || [null, null]; // Get coordinates from geometry or default to null

            // Create a readable address string from parts (e.g., "10, Main St, London") 
            const address = [
                properties['addr:housenumber'],
                properties['addr:street'],
                properties['addr:city'],
            ].filter(Boolean); // Remove any empty strings ie no house number then street name and city will still be displayed

            // Build a new object for each service
            const transformed = {
                id: properties['@id'] || properties.id || feature.id, // Use the first available ID
                name: properties['name'] || "", // Use name or empty string if missing
                address: address.join(', '), // Join address parts into a single string
                postcode: properties['addr:postcode'] || "", // Use postcode or empty string
                main_category: properties.amenity || "", // Use category (like pharmacy, hospital)
                phone: properties.phone || "", // Use phone or empty string
                website: properties.website || "", // Use website or empty string
                latitude: coords[1],  // Rotate coordinates - coordinates are usually [lng, lat] in GeoJSON
                longitude: coords[0],
                coords: [coords[1], coords[0]] // Leaflet expects [lat, lng]
            };

            return transformed;
        })
        
        // Filter out entries that don't have the minimum required fields
        .filter(item => 
            item.name && 
            item.address && 
            item.postcode &&
            item.main_category &&
            item.latitude != null && // Ensure latitude is not null
            item.longitude != null // Ensure longitude is not null
        );
}