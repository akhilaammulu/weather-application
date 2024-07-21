import React, { useState } from 'react';
import { Search, Sun, MapPin, Clock, Map, BarChart2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from './Navigation';
import Footer from './Footer';

const WeatherApp = () => {
    const [loading, setLoading] = useState(false);
    const [cityInput, setCityInput] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const popularCities = ['London', 'New York', 'Tokyo'];

    // API key for OpenWeather (replace with your actual API key)
    const API_KEY = '95df2630b7fcfd7627b2916cc2e9f8c3';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!cityInput) {
            setError('Please enter a city name');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`);
            const data = await response.json();

            if (response.ok) {
                setWeatherData({
                    city: data.name,
                    country: data.sys.country,
                    weatherDescription: data.weather[0].description,
                    temperature: data.main.temp,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    weatherIcon: data.weather[0].icon,
                });
            } else {
                setError(data.message || 'Error fetching weather data');
            }
        } catch (err) {
            setError('An error occurred while fetching weather data');
        }

        setLoading(false);
    };

    const handleCityChipClick = (city) => {
        setCityInput(city);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-300">
            <Navigation />

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

                            {/* Display Error */}
                            {error && (
                                <div className="mt-4 text-center text-red-500">{error}</div>
                            )}

                            {/* Weather Data */}
                            {weatherData && (
                                <div className="mt-8 text-center">
                                    <h2 className="text-2xl font-bold">{weatherData.city}, {weatherData.country}</h2>
                                    <p className="text-gray-600 mt-2">{weatherData.weatherDescription}</p>
                                    <div className="mt-4">
                                        <img
                                            src={`http://openweathermap.org/img/wn/${weatherData.weatherIcon}.png`}
                                            alt={weatherData.weatherDescription}
                                            className="mx-auto"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xl">{weatherData.temperature}°C</p>
                                        <p className="text-sm text-gray-500">Humidity: {weatherData.humidity}%</p>
                                        <p className="text-sm text-gray-500">Wind Speed: {weatherData.windSpeed} m/s</p>
                                    </div>
                                </div>
                            )}
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

            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon, text }) => (
    <div className="p-4">
        <div className="w-6 h-6 mx-auto mb-2 text-blue-500">{icon}</div>
        <p className="text-sm text-gray-600">{text}</p>
    </div>
);

export default WeatherApp;
