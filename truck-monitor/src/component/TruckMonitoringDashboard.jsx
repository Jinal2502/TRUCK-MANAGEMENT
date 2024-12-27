import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const routePoints = [
  { city: "Ahmedabad", lat: 23.0225, lng: 72.5714, distance: 0, fuel: 90 },
  { city: "Udaipur", lat: 24.5854, lng: 73.7125, distance: 262, fuel: 75 },
  { city: "Jaipur", lat: 26.9124, lng: 75.7873, distance: 528, fuel: 45 },
  { city: "Delhi", lat: 28.7041, lng: 77.1025, distance: 946, fuel: 15 }
];

const TruckDashboard = () => {
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null);
  const [fuelHistory, setFuelHistory] = useState([]);

  const calculateData = (progressValue) => {
    const index = Math.floor((progressValue / 100) * (routePoints.length - 1));
    const nextIndex = Math.min(index + 1, routePoints.length - 1);
    const fraction = (progressValue / 100) * (routePoints.length - 1) - index;

    const current = routePoints[index];
    const next = routePoints[nextIndex];

    const lat = current.lat + (next.lat - current.lat) * fraction;
    const lng = current.lng + (next.lng - current.lng) * fraction;
    const distance = current.distance + (next.distance - current.distance) * fraction;
    const fuelLevel = Math.max(90 - (distance / 10), 10);
    const speed = index === routePoints.length - 1 ? 0 : 65 + Math.random() * 10;
    const temperature = 85 + Math.random() * 5;
    
    const alerts = [];
    if (fuelLevel <= 30) alerts.push("⚠️ Fuel level critical - Refuel needed");
    if (fuelLevel <= 20) alerts.push("🔴 Emergency: Find nearest fuel station");
    if (progressValue > 40) alerts.push("⚠️ Rest break recommended - Driving for 4+ hours");
    if (speed > 70) alerts.push("⚠️ Speed limit warning");
    if (temperature > 88) alerts.push("⚠️ Engine temperature high");

    return {
      position: { lat, lng },
      city: `${current.city} → ${next.city}`,
      distance,
      fuelLevel,
      speed,
      temperature,
      alerts
    };
  };

  useEffect(() => {
    const newData = calculateData(progress);
    setData(newData);
    setFuelHistory(prev => [...prev, { 
      time: new Date().toLocaleTimeString(),
      fuel: newData.fuelLevel,
      distance: newData.distance
    }].slice(-20));
  }, [progress]);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Truck Management Dashboard</h1>
            <div className="bg-blue-900 px-4 py-2 rounded-md">
              <span className="text-blue-200 text-sm">Truck ID:</span>
              <span className="text-white ml-2 font-mono">GJ01XX1234</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Journey Control</h2>
            <div className="relative h-2 bg-gray-200 rounded-full mb-8">
              <div 
                className="absolute h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
              <input
                type="range"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="absolute w-full h-2 opacity-0 cursor-pointer"
              />
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{data.city}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600">⚡</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Speed</p>
                      <p className="text-lg font-semibold text-gray-800">{data.speed.toFixed(0)} km/h</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600">📍</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Distance</p>
                      <p className="text-lg font-semibold text-gray-800">{data.distance.toFixed(0)} km</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600">📌</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-sm font-mono text-gray-800">
                        {data.position.lat.toFixed(4)}, {data.position.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600">🌡️</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Temperature</p>
                      <p className="text-lg font-semibold text-gray-800">{data.temperature.toFixed(1)}°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Fuel Monitoring</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fuelHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#64748b"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fuel" 
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6">
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`absolute h-full transition-all duration-300 rounded-full ${
                    data.fuelLevel < 30 ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${data.fuelLevel}%` }}
                />
              </div>
              <p className="text-center mt-2 font-semibold text-gray-700">
                Fuel Level: {data.fuelLevel.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Active Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.alerts.length > 0 ? (
              data.alerts.map((alert, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${
                    alert.includes("Emergency")
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}
                >
                  <p className="font-medium">{alert}</p>
                </div>
              ))
            ) : (
              <div className="col-span-2 bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
                <p className="font-medium">All systems normal</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckDashboard;