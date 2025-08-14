// SearchBar component displays a search bar with a select dropdown for search type (name or postcode).
// Props:
// - searchTerm: the current search term (string).
// - setSearchTerm: function to update the search term.
// - searchBy: the current search type (string).
// - setSearchBy: function to update the search type.
// - setSelectedService: function to update the selected service.
// - setLocateUser: function to update the locate user state.

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  searchBy,
  setSearchBy,
  setSelectedService,
  setLocateUser,
}) {

  return (
    <div className="w-full">
      {/* Mobile: Stacked layout */}
      <div className="sm:hidden space-y-2">
        {/* Search input with icon */}
        <div className="relative rounded-md border border-nhs-border overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-nhs-yellow focus-within:border-nhs-blue dark:border-nhs-dark-border">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-nhs-gray"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder={`Search by ${searchBy}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 text-nhs-black placeholder-nhs-gray bg-white dark:bg-nhs-dark-gray dark:text-nhs-white focus:outline-none"
            aria-label={`Search by ${searchBy}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Search type selector */}
          <div className="relative">
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              className="block w-full rounded-md border border-nhs-border bg-nhs-light-blue text-nhs-black dark:bg-nhs-dark-gray dark:text-nhs-white px-3 py-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-nhs-yellow"
              aria-label="Select search type"
            >
              <option value="name">Search by Name</option>
              <option value="postcode">Search by Postcode</option>
            </select>
          </div>

          {/* Clear button */}
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSearchBy('postcode');
              setSelectedService(null);
              setLocateUser(true);
            }}
            className="px-4 py-2.5 rounded-md bg-nhs-blue text-white font-semibold hover:bg-nhs-blue-dark focus:outline-none focus:ring-2 focus:ring-nhs-yellow focus:ring-offset-1 transition whitespace-nowrap text-sm"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Desktop: Inline layout */}
      <div className="hidden sm:flex items-center space-x-2">
        {/* Input + select container */}
        <div className="flex-1 flex rounded-md border border-nhs-border overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-nhs-yellow focus-within:border-nhs-blue dark:border-nhs-dark-border">
          {/* Input wrapper for icon positioning */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-nhs-gray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder={`Search by ${searchBy}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-nhs-black placeholder-nhs-gray bg-white dark:bg-nhs-dark-gray dark:text-nhs-white focus:outline-none"
              aria-label={`Search by ${searchBy}`}
            />
          </div>

          {/* Select dropdown */}
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="bg-nhs-light-blue text-nhs-black dark:bg-nhs-dark-gray dark:text-nhs-white px-3 py-2.5 cursor-pointer border-l border-nhs-border focus:outline-none min-w-[8rem]"
            aria-label="Select search type"
          >
            <option value="name">Name</option>
            <option value="postcode">Postcode</option>
          </select>
        </div>

        {/* Clear button */}
        <button
          type="button"
          onClick={() => {
            setSearchTerm('');
            setSearchBy('postcode');
            setSelectedService(null);
            setLocateUser(true);
          }}
          className="px-4 py-2.5 rounded-md bg-nhs-blue text-white font-semibold hover:bg-nhs-blue-dark focus:outline-none focus:ring-2 focus:ring-nhs-yellow focus:ring-offset-1 transition whitespace-nowrap"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
