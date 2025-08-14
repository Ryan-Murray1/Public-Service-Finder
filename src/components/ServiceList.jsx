import React from 'react';

// ServiceList component displays a list of services with their details.
// Props:
// - services: an array of service objects to display.
// - selectedService: the currently selected service (object).
// - setSelectedService: function to update the selected service.
export default function ServiceList({ services, selectedService, setSelectedService }) {
    // If there are no services to show, display a message instead of an empty list
    if (services.length === 0) {
        return <p className="text-center text-nhs-dark-gray">No services found</p>;
    }

    // Helper function to format category (e.g., "pharmacy" -> "Pharmacy")
    const formatCategory = (category) => {
        if (!category) return ''; // if it's null or undefined, return empty
        return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    };

    // Function to handle service selection - sets the clicked service as the currently selected service by calling setSelectedService
    const handleServiceSelect = (service) => {
        setSelectedService(service);
    };

    // Reusable icon component for clarity
    const Icon = ({ path }) => (
        <svg className="w-3.5 h-3.5 mr-1.5 flex-shrink-0 text-nhs-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
        </svg>
    );

    return (
        <div className="h-full overflow-y-auto overflow-x-hidden px-2 pt-2 sm:px-3 sm:pt-3">
            <ul className="space-y-3 sm:space-y-4">
                {services.map((service) => {
                    const {
                        id,
                        name,
                        main_category,
                        address,
                        postcode,
                        phone,
                        website,
                    } = service;

                    const isSelected = selectedService?.id === id;

                    return (
                        <li
                            key={id}
                            onClick={() => handleServiceSelect(service)}
                            className={`p-3 sm:p-4 md:p-5 border rounded-lg sm:rounded-xl shadow-sm transition-all cursor-pointer ${
                                isSelected
                                    ? 'border-nhs-blue bg-nhs-blue-light/10 ring-2 ring-nhs-blue/30'
                                    : 'bg-nhs-light-gray dark:bg-white/5 hover:bg-nhs-blue-light/5 border-nhs-border dark:border-gray-600 text-nhs-black dark:text-gray-100'
                            }`}
                        >
                            {/* Name with responsive text size */}
                            <h3 className="text-base sm:text-lg font-bold text-nhs-blue dark:text-nhs-blue-light mb-1 line-clamp-2">
                                {name}
                            </h3>

                            {/* Category with badge style */}
                            <p className="text-xs sm:text-sm text-nhs-white dark:text-nhs-blue-light mb-2 font-medium">
                                <span className="inline-block bg-nhs-blue dark:bg-nhs-blue-dark text-white px-2 py-0.5 rounded-full">
                                    {formatCategory(main_category)}
                                </span>
                            </p>

                            {/* Address with icon */}
                            <div className="text-xs sm:text-sm text-nhs-dark-gray dark:text-gray-300 mb-2 space-y-0.5">
                                <p className="flex items-start">
                                    <Icon path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <span>{address}, {postcode}</span>
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div
                                className={`mt-2 sm:mt-3 pt-2 sm:pt-3 border-t text-xs sm:text-sm text-nhs-dark-gray dark:text-gray-300 ${
                                    isSelected ? 'border-nhs-divider border-t-2' : 'border-nhs-border'
                                }`}
                            >
                                {phone && (
                                    <p className="flex items-center mt-1">
                                        <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:underline">
                                            {phone}
                                        </a>
                                    </p>
                                )}

                                {website && (
                                    <p className="flex items-center mt-1">
                                        <Icon path="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        <a
                                            href={website.startsWith('http') ? website : `https://${website}`} // Add https:// if website doesn't start with http or https
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-nhs-link hover:underline break-all"
                                        >
                                            {website.replace(/^https?:\/\//, '').replace(/\/$/, '')} // Remove http:// or https:// from website URL
                                        </a>
                                    </p>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
