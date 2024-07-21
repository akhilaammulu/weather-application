import React, { useState } from 'react';
import { Search, Home, MapPin, ChartLine, Clock, Map, BarChart2, Navigation, Sunrise, Sun, Moon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// WeatherApp component (Main landing page)
const WeatherApp = () => {
    const [loading, setLoading] = useState(false);
    const [cityInput, setCityInput] = useState('');

    const popularCities = ['London', 'New York', 'Tokyo'];

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Add your form submission logic here
    };

    const handleCityChipClick = (city) => {
        setCityInput(city);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-300">
            {/* Navigation */}
            <nav className="bg-transparent py-4">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <a href="/" className="flex items-center text-white text-xl font-semibold">
                            <Sun className="mr-2" />
                            WeatherScope
                        </a>
                        <div className="hidden md:flex items-center space-x-6">
                            <a href="/" className="text-white flex items-center">
                                <Home className="w-4 h-4 mr-1" /> Home
                            </a>
                            <a href="#" className="text-white/80 flex items-center">
                                <MapPin className="w-4 h-4 mr-1" /> Locations
                            </a>
                            <a href="#" className="text-white/80 flex items-center">
                                <ChartLine className="w-4 h-4 mr-1" /> Forecast
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 mt-12">
                <div className="max-w-2xl mx-auto">
                    <Card className="bg-white/90 backdrop-blur-md">
                        <CardContent className="p-6">
                            <div className="text-center mb-8">
                                <h1 className="text-4xl font-bold flex items-center justify-center">
                                    <Sun className="mr-2" />
                                    WeatherScope
                                </h1>
                                <p className="text-gray-600 mt-2">Professional Weather Forecasting</p>
                            </div>

                            {/* Search Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="relative mb-6">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <Search className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200"
                                        placeholder="Enter city name..."
                                        value={cityInput}
                                        onChange={(e) => setCityInput(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Popular Cities */}
                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 mb-2">Popular Cities:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {popularCities.map((city) => (
                                            <button
                                                key={city}
                                                type="button"
                                                onClick={() => handleCityChipClick(city)}
                                                className="px-3 py-1 rounded-full border border-gray-300 text-sm flex items-center hover:bg-gray-100 transition-colors"
                                            >
                                                <MapPin className="w-3 h-3 mr-1" />{city}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Search Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
                                >
                                    {loading ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                            Loading...
                                        </div>
                                    ) : (
                                        <>
                                            <Sun className="mr-2" />
                                            Get Weather Forecast
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Features */}
                            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                                <div className="p-4">
                                    <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                                    <p className="text-sm text-gray-600">Real-time Data</p>
                                </div>
                                <div className="p-4">
                                    <Map className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                                    <p className="text-sm text-gray-600">Global Coverage</p>
                                </div>
                                <div className="p-4">
                                    <BarChart2 className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                                    <p className="text-sm text-gray-600">Detailed Analysis</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location Permission Card */}
                    <Card className="mt-4 bg-white/90">
                        <CardContent className="p-4">
                            <div className="flex items-center">
                                <Navigation className="text-blue-500 mr-3" />
                                <div>
                                    <h6 className="font-medium">Enable Location Services</h6>
                                    <p className="text-sm text-gray-500">Get accurate weather updates for your current location</p>
                                </div>
                                <button className="ml-auto text-blue-500">Enable</button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 pb-6 text-center text-white/80">
                <p className="text-sm">
                    © 2024 WeatherScope | Powered by Professional Weather Services
                </p>
                <div className="flex justify-center gap-2 mt-2">
                    <Sunrise className="w-4 h-4" />
                    <Sun className="w-4 h-4" />
                    <Moon className="w-4 h-4" />
                </div>
            </footer>
        </div>
    );
};

// WeatherDetails component (Weather results page)
const WeatherDetails = ({ city, country, weatherIcon, weatherDescription, temperature, humidity, windSpeed, error }) => {
    const getGradientByTemp = (temp) => {
        if (temp > 30) return 'from-orange-100 to-red-100';
        if (temp > 20) return 'from-yellow-100 to-orange-100';
        if (temp > 10) return 'from-blue-100 to-green-100';
        return 'from-blue-200 to-blue-100';
    };

    return (
        <div className={`min-h-screen w-full bg-gradient-to-br ${getGradientByTemp(temperature)} p-4 flex items-center justify-center`}>
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-md">
                <CardContent className="p-6">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        {city}, {country}
                    </h1>

                    <div className="text-center mb-6">
                        <Sun className="w-20 h-20 mx-auto text-blue-500 mb-2" />
                        <p className="text-xl text-gray-600 capitalize">{weatherDescription}</p>
                    </div>

                    <div className="space-y-4 bg-blue-50/50 rounded-lg p-4">
                        <div className="flex justify-between items-center p-2 border-b border-blue-100">
                            <span className="text-gray-600">Temperature</span>
                            <span className="font-semibold">{temperature}°C</span>
                        </div>
                        <div className="flex justify-between items-center p-2 border-b border-blue-100">
                            <span className="text-gray-600">Humidity</span>
                            <span className="font-semibold">{humidity}%</span>
                        </div>
                        <div className="flex justify-between items-center p-2">
                            <span className="text-gray-600">Wind Speed</span>
                            <span className="font-semibold">{windSpeed} m/s</span>
                        </div>
                    </div>

                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertDescription>Error: {error}</AlertDescription>
                        </Alert>
                    )}

                    <button
                        onClick={() => window.history.back()}
                        className="mt-6 w-full bg-blue-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                    >
                        Back to Search
                    </button>
                </CardContent>
            </Card>
        </div>
    );
};

// Example usage:
const App = () => {
    // You would typically use React Router to handle navigation between these components
    const [showWeather, setShowWeather] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    return showWeather && weatherData ? (
        <WeatherDetails {...weatherData} />
    ) : (
        <WeatherApp />
    );
};

export default App;