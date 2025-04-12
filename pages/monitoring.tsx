import { useEffect, useState } from "react";

interface SensorData {
  appliance1: number;
  appliance2: number;
  appliance3: number;
  timestamp?: string;
}

export default function MonitoringPage() {
  const [readings, setReadings] = useState<SensorData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSensorData = async () => {
    try {
      const res = await fetch("http://localhost:5000/sensor-data");

      if (!res.ok) {
        throw new Error("Failed to fetch from Flask backend");
      }

      const data = await res.json();

      const withTimestamp = {
        ...data,
        timestamp: new Date().toISOString(),
      };

      setReadings((prev) => [...prev.slice(-19), withTimestamp]);
      setError(null); // clear error if successful
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError("⚠️ Could not connect to the sensor server. Please ensure Flask is running.");
    }
  };

  useEffect(() => {
    fetchSensorData(); // fetch immediately
    const interval = setInterval(fetchSensorData, 3000); // fetch every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">⚡ Current Sensor Monitoring</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded shadow">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["appliance1", "appliance2", "appliance3"].map((key) => (
          <div key={key} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">{key.toUpperCase()}</h2>
            <div className="text-4xl text-blue-600 font-bold">
              {readings.length > 0 ? readings[readings.length - 1][key as keyof SensorData] : "-"} A
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-2 text-gray-700">Reading History (Last 20)</h2>
      <div className="overflow-auto">
        <table className="table-auto w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Timestamp</th>
              <th className="border px-4 py-2">Appliance 1 (A)</th>
              <th className="border px-4 py-2">Appliance 2 (A)</th>
              <th className="border px-4 py-2">Appliance 3 (A)</th>
            </tr>
          </thead>
          <tbody>
            {readings.map((reading, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">
                  {new Date(reading.timestamp || "").toLocaleTimeString()}
                </td>
                <td className="border px-4 py-2">{reading.appliance1}</td>
                <td className="border px-4 py-2">{reading.appliance2}</td>
                <td className="border px-4 py-2">{reading.appliance3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
