import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white flex items-center justify-center px-6 py-10">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-yellow-600 text-center mb-10 tracking-wide drop-shadow">
          ⚡ Electrical Monitoring System
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls Section */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-yellow-700 mb-3">🔘 Controls</h2>
              <p className="text-gray-700">
                Switch your appliances ON or OFF with ease using our smart control panel. 
                Interact with each connected device and observe its current state in real-time.
              </p>
            </div>
            <Link href="/controls">
              <button className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-xl transition-all">
                Go to Controls
              </button>
            </Link>
          </div>

          {/* Monitoring Section */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-green-700 mb-3">📈 Monitoring</h2>
              <p className="text-gray-700">
                View live sensor data from each appliance. The monitoring dashboard provides insights
                into power consumption trends and helps you stay informed about your electrical usage.
              </p>
            </div>
            <Link href="/monitoring">
              <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition-all">
                Go to Monitoring
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
