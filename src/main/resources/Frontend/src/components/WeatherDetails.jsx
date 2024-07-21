import React from 'react';
import { Sun } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
                        <WeatherDetailRow label="Temperature" value={`${temperature}°C`} />
                        <WeatherDetailRow label="Humidity" value={`${humidity}%`} />
                        <WeatherDetailRow label="Wind Speed" value={`${windSpeed} m/s`} isLast />
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

const WeatherDetailRow = ({ label, value, isLast = false }) => (
    <div className={`flex justify-between items-center p-2 ${!isLast && 'border-b border-blue-100'}`}>
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold">{value}</span>
    </div>
);

export default WeatherDetails;