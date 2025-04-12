'use client';

import { useEffect, useState } from 'react';
import SensorCard from '@/components/SensorCard';
import CurrentTable from '@/components/CurrentTable';

type SensorData = {
  appliance1: number;
  appliance2: number;
  appliance3: number;
};

const API_BASE = 'http://localhost:5000';

export default function MonitoringPage() {
  const [currentData, setCurrentData] = useState<SensorData>({
    appliance1: 0,
    appliance2: 0,
    appliance3: 0,
  });

  const [history, setHistory] = useState<any[]>([]);

  const fetchSensorData = async () => {
    try {
      const res = await fetch(`${API_BASE}/sensor-data`);
      const data = await res.json();

      setCurrentData(data);

      // Post to MongoDB API
      await fetch('/api/save-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      });

      setHistory((prev) => [
        { ...data, timestamp: new Date().toISOString() },
        ...prev.slice(0, 19), // Keep last 20
      ]);
    } catch (err) {
      console.error('Sensor fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchSensorData(); // initial fetch
    const interval = setInterval(fetchSensorData, 3000); // Fetch every 3 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">🔌 Current Monitoring</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SensorCard name="Appliance 1" value={currentData.appliance1} />
        <SensorCard name="Appliance 2" value={currentData.appliance2} />
        <SensorCard name="Appliance 3" value={currentData.appliance3} />
      </div>

      <h2 className="text-xl font-semibold mt-12 mb-4 text-gray-700">📋 Past Readings</h2>
      <CurrentTable readings={history} />
    </div>
  );
}
