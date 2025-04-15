'use client';

import { useEffect, useState } from 'react';
import { Lightbulb } from 'lucide-react';

const phaseLines = [
  { id: '1', name: 'Phase Line 1' },
  { id: '2', name: 'Phase Line 2' },
  { id: '3', name: 'Phase Line 3' },
];

export default function ControlPanel() {
  const [statuses, setStatuses] = useState<{ [key: string]: boolean }>({
    '1': false,
    '2': false,
    '3': false,
  });

  // Fetch status on load
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/bulb-status`, {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
          },
        });
        
        if (!res.ok) throw new Error('Failed to fetch phase line status');
        const data = await res.json();

        // Ensure status is populated correctly
        setStatuses(data.statuses);
      } catch (err) {
        console.error('Error fetching phase line status:', err);
      }
    };

    fetchStatus();
  }, []);

  // Turn ON/OFF phase line
  const handleControl = async (phaseLineId: string, action: 'on' | 'off') => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/light/${phaseLineId}/${action}`, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) throw new Error('Failed to control phase line');
      const data = await res.json();
      
      // Update the status after control action
      setStatuses((prev) => ({ ...prev, [phaseLineId]: data.status === 'on' }));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold text-yellow-600 mb-8 tracking-wide drop-shadow">
          ⚡ Phase Line Control Panel
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {phaseLines.map((phaseLine) => (
            <div
              key={phaseLine.id}
              className="bg-white border border-yellow-300 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-medium text-yellow-700 flex items-center gap-2">
                  <Lightbulb size={22} className="text-yellow-500" />
                  {phaseLine.name}
                </span>

                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full shadow-sm transition duration-300 ${
                    statuses[phaseLine.id]
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {statuses[phaseLine.id] ? 'ON' : 'OFF'}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleControl(phaseLine.id, 'on')}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-2 font-semibold rounded-xl shadow-sm transition-all"
                >
                  Turn ON
                </button>
                <button
                  onClick={() => handleControl(phaseLine.id, 'off')}
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
