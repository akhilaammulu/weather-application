import React from 'react';
import { Sunrise, Sun, Moon } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-12 pb-6 text-center text-white/80">
            <p className="text-sm">
                © {new Date().getFullYear()} WeatherScope | Powered by Professional Weather Services
            </p>
            <div className="flex justify-center gap-2 mt-2">
                <Sunrise className="w-4 h-4" />
                <Sun className="w-4 h-4" />
                <Moon className="w-4 h-4" />
            </div>
        </footer>
    );
};

export default Footer;