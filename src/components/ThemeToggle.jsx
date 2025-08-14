import { useEffect, useState } from 'react';

function ThemeToggle() {
    // State to track if dark mode is enabled (default false = light mode)
    const [darkMode, setDarkMode] = useState(false);

    // When darkMode changes, update the <html> element's class accordingly
    useEffect(() => {
        if (darkMode) {
            // If dark mode is true, add 'dark' class to the <html> element
            // This triggers Tailwind's dark mode styles (configured with 'class' strategy)
            document.documentElement.classList.add('dark')
        } else {
            // If dark mode is false, remove 'dark' class from <html>
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode]) // Dependency array - effect runs whenever darkMode changes

    return (
        // Button toggles darkMode state when clicked
        <button
            onClick={() => setDarkMode(!darkMode)}
             className="relative w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center transition-colors p-1"
             aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"} // Accessibility: aria-label updates to reflect current mode and the action it will perform
        >
            {darkMode ? '🌙' : '🌞'} {/* The moon emoji (🌙) is shown when dark mode is enabled, and the sun emoji (🌞) is shown when dark mode is disabled */}
        </button>
    )
}

export default ThemeToggle