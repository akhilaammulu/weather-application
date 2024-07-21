import React from 'react';
import { Sun, Home, MapPin, ChartLine } from 'lucide-react';

const Navigation = () => {
    return (
        <nav className="bg-transparent py-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <a href="/" className="flex items-center text-white text-xl font-semibold">
                        <Sun className="mr-2" />
                        WeatherScope
                    </a>
                    <div className="hidden md:flex items-center space-x-6">
                        <NavLink href="/" icon={<Home className="w-4 h-4" />} text="Home" active />
                        <NavLink href="#" icon={<MapPin className="w-4 h-4" />} text="Locations" />
                        <NavLink href="#" icon={<ChartLine className="w-4 h-4" />} text="Forecast" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ href, icon, text, active }) => (
    <a
        href={href}
        className={`text-white flex items-center ${active ? '' : 'opacity-80 hover:opacity-100 transition-opacity'}`}
    >
        <span className="mr-1">{icon}</span>
        {text}
    </a>
);

export default Navigation;