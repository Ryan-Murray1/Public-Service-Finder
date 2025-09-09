# Public Service Finder

A modern, accessible web application for finding public services in your area, inspired by NHS design principles and built with React.

---

## 🚀 Features

- **Interactive Map:** View service locations with marker clustering for easy navigation  
- **Search & Filter:** Find services by name, postcode, or service type  
- **User Location:** Center map on your current location (with permission)  
- **Dark/Light Mode:** Toggle between accessible themes to reduce eye strain  
- **Responsive Design:** Optimized for desktop and mobile devices  
- **Accessibility:** Built with ARIA roles, keyboard navigation, and screen reader support  

---

## 🛠️ Technology Stack & Tools

- **React.js:** Component-driven UI with real-time state management (useState)  
- **Tailwind CSS:** Utility-first styling aligned to NHS colors and typography  
- **React-Leaflet & Leaflet.js:** Map rendering and interactivity with clustering  
- **react-leaflet-markercluster:** Efficient grouping of map markers  
- **Geolib:** Client-side geospatial calculations for proximity sorting  
- **JavaScript (ES6+):** Modern syntax and features throughout the codebase  
- **JSON Data:** Static service data simulating backend integration  
- **Vite:** Fast development server and build tool  

---

## 📂 Application Structure

public-service-finder/
├── src/
│   ├── components/
│   │   ├── CenterMapOnUser.jsx     # Manage user geolocation and map centering
│   │   ├── Header.jsx              # App header and theme toggle
│   │   ├── SearchBar.jsx           # Search input and filtering
│   │   ├── ServiceList.jsx         # Scrollable list of services
│   │   ├── ServiceMap.jsx          # Interactive map with markers
│   │   ├── ServiceTypeFilter.jsx   # Filter by service categories
│   │   ├── ThemeToggle.jsx         # Dark/light mode switch button
│   │   └── ZoomToService.jsx       # Zoom map to selected service
│   ├── data/                       # JSON data files for services
│   ├── utils/                      # Helper functions and fixes (e.g. Leaflet icon fix)
│   ├── App.jsx                     # Root component managing state and layout
│   └── main.jsx                    # Entry point rendering the app
├── public/                         # Static assets
└── index.html                      # HTML template

---

📝 Setup & Installation

    1. Clone the repo
       git clone https://github.com/Ryan-Murray1/Public-Service-Finder.git
       cd Public-Service-Finder

    2. Install dependencies
       npm install

    3. Run the development server
       npm run dev
       
    4. Open http://localhost:5173 in your browser to see the application.

---

🎨 Styling & Accessibility

    Uses Tailwind CSS with NHS color variables and font family for brand consistency

    Dark mode toggle respects user preference and improves readability

    ARIA roles, labels, and screen-reader-only text enhance accessibility

    Responsive layout adapts seamlessly from mobile to desktop

---

🛠️ Challenges & Solutions

    Leaflet Marker Icons in Vite: Overrode default Leaflet icon URLs to fix broken marker display

    State Management: Centralized state in App.jsx with prop drilling to synchronize components

    Geolocation Errors: Added permissions checks and graceful fallbacks for unsupported browsers

    Accessibility: Applied ARIA attributes, focus management, and semantic HTML

---

🚀 Potential Improvements

    Detailed service info modal dialogs

    Integration with live NHS APIs for real-time data

    Persisting user preferences with localStorage

    Voice search for enhanced accessibility

    Enhanced mobile map interactions (pinch zoom, gestures)

    Loading indicators during asynchronous actions

---

    🙏 Acknowledgments

    NHS Digital Design System for UI and branding inspiration

    OpenStreetMap contributors for map data

    Vite and React communities for excellent developer tooling

    Stack Overflow and open source community for shared Leaflet fixes
