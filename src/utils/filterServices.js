/* 
  This function filters services based on:
  - A user-entered search term
  - A selected service type
  - The selected field to search by (e.g., name or postcode)
*/

export default function filterServices(services, searchTerm, selectedType, searchBy) {
    return services.filter(service => {

        // Extract relevant fields from the service object.
        // Use empty strings as fallbacks to avoid issues with null/undefined values.
        const name = service.name || '';
        const postcode = service.postcode || '';
        const type = service.main_category || '';

        // Dynamically choose which field to search (name or postcode)
        const searchField = searchBy === 'postcode' ? postcode : name;

        // Check if the selected field contains the search term (case-insensitive)
        const matchesSearch = searchField.toLowerCase().includes(searchTerm.toLowerCase());

        // Check if the service type matches the selected type (case-insensitive)
        // If no type is selected (empty string), all types are allowed
        const matchesType = selectedType === '' || type.toLowerCase().includes(selectedType.toLowerCase());

        // Include the service only if it matches both the search term and the selected type
        return matchesSearch && matchesType;
    });
}
