import { useState } from 'react'
import Header from './components/Header' // Component to display the header
import SearchBar from './components/SearchBar' // Component to display the search bar
import ServiceTypeFilter from './components/ServiceTypeFilter' // Component to display the service type filter
import filterServices from './utils/filterServices' // Utility function to filter services based on search term and selected type
import servicesJson from './data/services.json' // Import the raw JSON data
import transformJson from './utils/transformJson' // Utility function to transform the raw JSON data into a more useful format
import ServiceList from './components/ServiceList' // Component to display the list of services
import ServiceMap from './components/ServiceMap' // Component to display the map of services

function App() {
  // Transform the raw JSON data into a more useful format
  const services = transformJson(servicesJson) // Array of simplified service objects (id, name, address, postcode, main_category, phone, website, latitude, longitude, coords) returned from transformJson function

  // Declare state for the search box. Initially, it's empty.
  const [searchTerm, setSearchTerm] = useState('') // The specific search term the user types into the search box

  // Declare state for the service type filter. Initially, it's empty.
  const [selectedType, setSelectedType] = useState('') // The specific service type the user clicks on

  // Declare state for the selected service. Initially, it's null.
  const [selectedService, setSelectedService] = useState(null) // The specific service the user clicks on

  const [searchBy, setSearchBy] = useState('postcode'); // The specific field the user wants to search by (e.g., name or postcode)

  // State to control when we want to locate the user
  const [locateUser, setLocateUser] = useState(false); // Whether the user wants to be located

  // State to control loading state
  const [loading, setLoading] = useState(false); // Whether the app is loading
    
  // ServiceTypes process:
  // 1. Mapping all services to their main_category values (array of strings).
  // 2. Filtering out any falsy values like null or undefined.
  // 3. Creating a Set to remove duplicate categories (Set is an iterable but NOT an array).
  // 4. Using the spread operator (...) to unpack Set items into a new array.
  // 5. Sorting the array alphabetically for display.
  const serviceTypes = [...new Set(services.map(s => s.main_category).filter(Boolean))].sort();

  // Filter the services based on the search term, selected type, and search by field
  const filtered = filterServices(services, searchTerm, selectedType, searchBy)

  return (
    <div className="h-screen flex flex-col nhs-light-bg dark:nhs-dark-bg text-nhs-black dark:text-nhs-white">
      <Header />

      <main className="flex-1 flex flex-col p-4 sm:p-6 max-w-6xl w-full mx-auto h-[calc(100vh-80px)] overflow-hidden">
        {/* Search and Filter Section */}
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4 mb-4 w-full">
          <div className="w-full sm:w-2/3">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              searchBy={searchBy} 
              setSearchBy={setSearchBy} 
              setLocateUser={setLocateUser} 
              setSelectedService={setSelectedService} 
            />
          </div>
          
          <div className="w-full sm:w-1/3">
            <ServiceTypeFilter 
              selectedType={selectedType} 
              setSelectedType={setSelectedType} 
              options={serviceTypes} 
            />
          </div>
        </div>

        {/* Services and Map Section - Using fixed height container */}
        <div className="flex flex-1 flex-col lg:flex-row gap-4 sm:gap-6 h-full overflow-hidden">
          {/* Services List */}
          <section className="w-full lg:w-1/2 h-full overflow-hidden">
            <div className="h-full pr-1 sm:pr-2 overflow-y-auto">
              <ServiceList 
                services={filtered} 
                selectedService={selectedService} 
                setSelectedService={setSelectedService} 
              />
            </div>
          </section>

          {/* Map */}
          <section className="w-full lg:w-1/2 h-full">
            <div className="h-full rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
              <h2 className="sr-only">Service Locations</h2>
              <div className="h-full w-full">
                <ServiceMap 
                  services={filtered} 
                  selectedService={selectedService} 
                  locateUser={locateUser} 
                  setLocateUser={setLocateUser} 
                  loading={loading} 
                  setLoading={setLoading} 
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
