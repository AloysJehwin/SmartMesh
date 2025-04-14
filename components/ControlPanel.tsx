'use client';

import { useState } from 'react';
import { Lightbulb } from 'lucide-react';

const bulbs = [
  { id: '1', name: 'Bulb 1' },
  { id: '2', name: 'Bulb 2' },
  { id: '3', name: 'Bulb 3' },
];

export default function ControlPanel() {
  const [statuses, setStatuses] = useState<{ [key: string]: boolean }>({});

  const handleControl = async (bulbId: string, action: 'on' | 'off') => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/light/${bulbId}/${action}`, {
        method: 'POST',
      });

      if (!res.ok) throw new Error('Failed to control bulb');

      const data = await res.json();
      setStatuses((prev) => ({ ...prev, [bulbId]: data.status === 'on' }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold text-yellow-600 mb-8 tracking-wide drop-shadow">
          💡 Smart Bulb Control Panel
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {bulbs.map((bulb) => (
            <div
              key={bulb.id}
              className="bg-white border border-yellow-300 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-medium text-yellow-700 flex items-center gap-2">
                  <Lightbulb size={22} className="text-yellow-500" />
                  {bulb.name}
                </span>

                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full shadow-sm transition duration-300 ${
                    statuses[bulb.id]
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {statuses[bulb.id] ? 'ON' : 'OFF'}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleControl(bulb.id, 'on')}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 font-semibold rounded-xl shadow-sm transition-all"
                >
                  Turn ON
                </button>
                <button
                  onClick={() => handleControl(bulb.id, 'off')}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 font-semibold rounded-xl shadow-sm transition-all"
                >
                  Turn OFF
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-500 italic">
          🔌 Connected to Flask server on port <span className="font-medium">5000</span>
        </p>
      </div>
    </div>
  );
}
