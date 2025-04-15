'use client';

import { useEffect, useState } from "react";
import { AgGauge } from "ag-charts-react";
import "ag-charts-enterprise";

const VOLTAGE = 230;

type ApplianceKey = "appliance1" | "appliance2" | "appliance3";

interface SensorData {
  appliance1: number;
  appliance2: number;
  appliance3: number;
  status: {
    appliance1: boolean;
    appliance2: boolean;
    appliance3: boolean;
  };
  timestamp: string;
}

export default function MonitoringPage() {
  const [readings, setReadings] = useState<SensorData | null>(null);
  const [energy, setEnergy] = useState<Record<ApplianceKey, number>>({
    appliance1: 0,
    appliance2: 0,
    appliance3: 0,
  });
  const [totalPowerConsumed, setTotalPowerConsumed] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchSensorData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/sensor-data`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (!res.ok) throw new Error("Failed to fetch sensor data from Flask");
      const data: SensorData = await res.json();
      setReadings(data);
      setError(null);
    } catch (err) {
      console.error("Sensor fetch error:", err);
      setError("⚠️ Error connecting to Flask or MongoDB.");
    }
  };

  const calculateEnergy = (reading: SensorData) => {
    const appliances: ApplianceKey[] = ["appliance1", "appliance2", "appliance3"];
    let total = 0;
    const newEnergy: Record<ApplianceKey, number> = {
      appliance1: 0,
      appliance2: 0,
      appliance3: 0,
    };

    appliances.forEach((key) => {
      const isOn = reading.status[key];
      const current = isOn ? reading[key] : 0;
      const amps = current / 1000;
      const powerW = amps * VOLTAGE;
      const powerKWh = powerW / 1000;
      newEnergy[key] = powerKWh;
      total += powerKWh;
    });

    setEnergy(newEnergy);
    setTotalPowerConsumed(total);
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (readings) {
      calculateEnergy(readings);
    }
  }, [readings]);

  const getCurrentPower = (amp: number) => (amp / 1000) * VOLTAGE;

  const getGaugeColor = (status: boolean) =>
    status
      ? [
          { to: 0.33, color: "#FBBF24" },
          { to: 0.66, color: "#F59E0B" },
          { to: 1, color: "#F97316" },
        ]
      : [{ to: 1, color: "#FDE68A" }]; // lighter yellow when OFF

  return (
    <div className="p-6 bg-gradient-to-br from-yellow-100 to-white min-h-screen font-sans">
      <h1 className="text-4xl font-extrabold text-center text-yellow-800 mb-8 drop-shadow-md">
        🏡 Home Automation Monitoring Dashboard
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-400 rounded shadow-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {readings &&
          (["appliance1", "appliance2", "appliance3"] as ApplianceKey[]).map((key, i) => {
            const label = `Phase Line ${i + 1}`;
            const status = readings.status[key];
            const value = status ? readings[key] : 0;
            const power = getCurrentPower(value);

            return (
              <div
                key={key}
                className={`bg-white border-l-4 ${
                  status ? "border-yellow-500" : "border-gray-400"
                } p-6 rounded-lg shadow hover:shadow-xl transition-all duration-300`}
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{label}</h2>
                <AgGauge
                  options={{
                    type: "radial-gauge",
                    value: value,
                    scale: {
                      min: 0,
                      max: 1,
                    },
                    needle: { enabled: true },
                  }}
                />
                <div className="text-md mt-3">
                  <p>Status: <span className={status ? "text-green-600" : "text-red-600"}>{status ? "ON" : "OFF"}</span></p>
                  <p className="text-gray-600">Current: {value.toFixed(3)} A</p>
                  <p className="text-gray-600">Power: {power.toFixed(2)} W</p>
                  <p className="text-gray-600">Energy: {energy[key]?.toFixed(3)} kWh</p>
                </div>
              </div>
            );
          })}
      </div>

      <div className="bg-yellow-300 text-yellow-800 p-5 rounded-lg shadow-lg text-xl font-bold text-center mb-10">
        🔋 Total Power Consumed: {totalPowerConsumed.toFixed(3)} kWh
      </div>

      <div className="bg-yellow-100 p-4 text-yellow-700 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold">🏠 Current Monitoring Devices</h3>
        <p className="text-md">
          This system tracks energy consumption of phase lines in real time. Devices are controlled through automated switching,
          ensuring power-saving and efficient home automation.
        </p>
      </div>
    </div>
  );
}
