import React, { useState } from 'react';
import WeatherDetails from './WeatherDetails';  // Assuming the WeatherDetails component is in the same directory
import { Input } from '@/components/ui/input';  // Assuming you're using some custom input component
import { Button } from '@/components/ui/button';  // Assuming you're using some custom button component
import { Alert, AlertDescription } from '@/components/ui/alert';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!city || !country) {
            setError('Please enter both city and country.');
            return;
        }

        setError('');

        try {
            // Replace this URL with your actual weather API URL
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=YOUR_API_KEY&units=metric`);
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
                setError(data.message || 'Error fetching weather data.');
            }
        } catch (error) {
            setError('An error occurred while fetching weather data.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-200 to-blue-100">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Weather App</h1>

                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="space-y-4">
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                placeholder="Enter country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Search
                        </Button>
                    </div>
                </form>

                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {weatherData && (
                    <WeatherDetails
                        city={weatherData.city}
                        country={weatherData.country}
                        weatherIcon={weatherData.weatherIcon}
                        weatherDescription={weatherData.weatherDescription}
                        temperature={weatherData.temperature}
                        humidity={weatherData.humidity}
                        windSpeed={weatherData.windSpeed}
                        error={error}
                    />
                )}
            </div>
        </div>
    );
};

export default WeatherApp;
