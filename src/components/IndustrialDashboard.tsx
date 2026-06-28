import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Zap, AlertTriangle } from 'lucide-react';

const powerConsumptionData = [
  { name: '00:00', power: 120 },
  { name: '03:00', power: 150 },
  { name: '06:00', power: 130 },
  { name: '09:00', power: 180 },
  { name: '12:00', power: 200 },
  { name: '15:00', power: 190 },
  { name: '18:00', power: 220 },
  { name: '21:00', power: 210 },
];

const IndustrialDashboard = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for hardware models..."
          className="bg-gray-800 border border-gray-700 rounded-full py-3 px-6 w-full max-w-md mx-auto block focus:outline-none focus:border-orange-500"
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Critical Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-800/20 border border-red-500 rounded-lg p-4 flex items-center animate-pulse">
            <AlertTriangle className="text-red-500 mr-4" />
            <div>
              <h4 className="font-bold">Thermal Warning</h4>
              <p className="text-sm">Unit #3 overheating</p>
            </div>
          </div>
          <div className="bg-yellow-800/20 border border-yellow-500 rounded-lg p-4 flex items-center">
            <Zap className="text-yellow-500 mr-4" />
            <div>
              <h4 className="font-bold">Voltage Fluctuation</h4>
              <p className="text-sm">Unit #1 experiencing voltage drops</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Model X</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={powerConsumptionData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Line type="monotone" dataKey="power" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Model Y</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={powerConsumptionData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Line type="monotone" dataKey="power" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Model Z</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={powerConsumptionData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Line type="monotone" dataKey="power" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default IndustrialDashboard;
