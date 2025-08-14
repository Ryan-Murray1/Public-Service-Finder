import ThemeToggle from './ThemeToggle';

// Header component displays a header with a title and a theme toggle button

export default function Header() {
    return (
        <header className="bg-nhs-blue text-nhs-white shadow-md relative">
            <div className="px-4 py-4 flex items-center justify-center">
                <h1 className="text-2xl font-bold">Public Service Finder</h1>

                {/* ThemeToggle button placed at the top-right corner using absolute positioning */}   
                <div className="absolute top-4 right-4">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}