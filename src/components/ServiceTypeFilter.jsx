import React from 'react';

// ServiceTypeFilter component allows users to select a service type from a dropdown.
// Props:
// - selectedType: the currently selected service type (string).
// - setSelectedType: function to update the selected service type.
// - options: an array of available service types to choose from.

// Helper function to format category strings like 'beauty_clinic' to 'Beauty Clinic'
const formatCategory = (str) => {
    return str
        .split('_') // Split string into array of words by the underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string with spaces between them
}

// ServiceTypeFilter component allows users to select a service type from a dropdown.
// Props:
// - selectedType: the currently selected service type (string).
// - setSelectedType: function to update the selected service type.
// - options: an array of available service types to choose from.

export default function ServiceTypeFilter({selectedType, setSelectedType, options}) {
    return (
        <div className="w-full">
            {/* Mobile: Full width with larger touch targets */}
            <div className="sm:hidden w-full">
                <label htmlFor="mobile-service-type-select" className="block text-sm font-medium text-nhs-dark-gray dark:text-nhs-light-gray mb-1">
                    Filter by service type
                </label>
                <div className="relative">
                    <select
                        id="mobile-service-type-select"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full p-3 h-12 border border-nhs-border rounded-md focus:border-nhs-blue focus:outline-none focus:ring-2 focus:ring-nhs-yellow bg-white text-nhs-black dark:bg-nhs-dark-gray dark:text-nhs-white appearance-none"
                        aria-label="Filter by service type"
                    >
                        <option value="">All Service Types</option>
                        {options.map(opt => (
                            <option key={opt} value={opt}>
                                {formatCategory(opt)}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-nhs-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Desktop: Compact version */}
            <div className="hidden sm:block relative">
                <label htmlFor="desktop-service-type-select" className="sr-only">
                    Filter by service type
                </label>
                <div className="relative">
                    <select
                        id="desktop-service-type-select"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full p-2 h-10 border border-nhs-border rounded-md focus:border-nhs-blue focus:outline-none focus:ring-2 focus:ring-nhs-yellow bg-white text-nhs-black dark:bg-nhs-dark-gray dark:text-nhs-white appearance-none pr-8"
                        aria-label="Filter by service type"
                    >
                        <option value="">All Types</option>
                        {options.map(opt => (
                            <option key={opt} value={opt}>
                                {formatCategory(opt)}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="h-4 w-4 text-nhs-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
