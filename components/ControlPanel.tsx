'use client';

import { useState } from 'react';
import { Lightbulb } from 'lucide-react';

const API_BASE = 'http://localhost:5000';

const bulbs = [
  { id: '1', name: 'Bulb 1' },
  { id: '2', name: 'Bulb 2' },
  { id: '3', name: 'Bulb 3' },
];

export default function ControlPanel() {
  const [statuses, setStatuses] = useState<{ [key: string]: boolean }>({});

  const handleControl = async (bulbId: string, action: 'on' | 'off') => {
    try {
      const res = await fetch(`${API_BASE}/light/${bulbId}/${action}`, {
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
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-yellow-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl text-center">
        <h2 className="text-3xl font-bold text-yellow-700 mb-6">💡 Bulb Control Panel</h2>

        <div className="grid gap-6">
          {bulbs.map((bulb) => (
            <div
              key={bulb.id}
              className="bg-yellow-50 p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg text-yellow-800 flex items-center gap-2">
                  <Lightbulb size={20} />
                  {bulb.name}
                </span>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded ${
                    statuses[bulb.id]
                      ? 'bg-green-200 text-green-700'
                      : 'bg-red-200 text-red-700'
                  }`}
                >
                  {statuses[bulb.id] ? 'ON' : 'OFF'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleControl(bulb.id, 'on')}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-xl transition"
                >
                  Turn ON
                </button>
                <button
                  onClick={() => handleControl(bulb.id, 'off')}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-xl transition"
                >
                  Turn OFF
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-gray-500">Connected to Flask server on port 5000</p>
      </div>
    </div>
  );
}
