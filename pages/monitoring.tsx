import { useEffect, useState } from "react";

interface SensorData {
  appliance1: number;
  appliance2: number;
  appliance3: number;
  timestamp: string;
}

const VOLTAGE = 230;

export default function MonitoringPage() {
  const [readings, setReadings] = useState<SensorData[]>([]);
  const [energy, setEnergy] = useState<{ [key: string]: number }>({
    appliance1: 0,
    appliance2: 0,
    appliance3: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const fetchSensorData = async () => {
    try {
      const res = await fetch("http://localhost:5000/sensor-data");
      if (!res.ok) throw new Error("Failed to fetch sensor data from Flask");
      const data: SensorData = await res.json();

      await uploadSensorDataToMongoDB(data);

      setReadings((prev) => [...prev.slice(-19), data]);
      setError(null);
    } catch (err) {
      console.error("Sensor fetch error:", err);
      setError("⚠️ Error connecting to Flask or MongoDB.");
    }
  };

  const uploadSensorDataToMongoDB = async (data: SensorData) => {
    try {
      const response = await fetch("/api/upload-sensor-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Error uploading to MongoDB");

      const result = await response.json();
      console.log("MongoDB Upload:", result.message);
    } catch (err) {
      console.error("Mongo Upload Error:", err);
    }
  };

  const calculateEnergy = (readings: SensorData[]) => {
    const calculatedEnergy: { [key: string]: number } = {
      appliance1: 0,
      appliance2: 0,
      appliance3: 0,
    };

    for (let i = 1; i < readings.length; i++) {
      const prev = readings[i - 1];
      const curr = readings[i];
      const timeDiffHrs =
        (new Date(curr.timestamp).getTime() - new Date(prev.timestamp).getTime()) /
        (1000 * 60 * 60);

      (["appliance1", "appliance2", "appliance3"] as const).forEach((key) => {
        const avgCurrent = (curr[key] + prev[key]) / 2;
        const powerWatt = avgCurrent * VOLTAGE;
        const energyKwh = (powerWatt * timeDiffHrs) / 1000;
        calculatedEnergy[key] += energyKwh;
      });
    }

    setEnergy(calculatedEnergy);
    console.log("Energy values:", calculatedEnergy);

  };
  

  const fetchPreviousReadings = async () => {
    try {
      const response = await fetch("/api/fetch-history");
      if (!response.ok) throw new Error("Failed to fetch history from MongoDB");
      const history: SensorData[] = await response.json();
      setReadings(history.slice(-20));
    } catch (err) {
      console.error("History fetch error:", err);
      setError("⚠️ Couldn't fetch previous data from MongoDB.");
    }
  };

  useEffect(() => {
    fetchPreviousReadings();
    const interval = setInterval(fetchSensorData, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (readings.length > 1) calculateEnergy(readings);
  }, [readings]);

  const totalEnergy = Object.values(energy)
  .map((e) => Number(e))
  .reduce((a, b) => a + b, 0)
  .toFixed(3);


  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Current Sensor Monitoring</h1>

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
              {readings.length > 0
                ? readings[readings.length - 1][key as keyof SensorData]
                : "-"}{" "}
              A
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Energy: {energy[key]?.toFixed(3) || "0.000"} kWh
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 text-blue-900 p-4 rounded-lg shadow text-lg font-semibold mb-6">
        🔋 Total Power Consumed: {totalEnergy} kWh
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
                  {new Date(reading.timestamp).toLocaleTimeString()}
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
