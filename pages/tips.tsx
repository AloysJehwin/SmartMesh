import React from 'react';
import Navbar from '../components/Navbar';

const TipsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] px-6 py-12 bg-gradient-to-br from-yellow-50 to-white flex flex-col items-center">
        <h2 className="text-3xl font-bold text-yellow-800 mb-6 animate-fade-in">
          💡 Waste Segregation Tips
        </h2>
        <ul className="list-none space-y-4 w-full max-w-2xl">
          <li className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
            <strong>🟢 Tip 1:</strong> Keep <span className="font-semibold">wet and dry waste</span> separate to avoid contamination.
          </li>
          <li className="bg-white p-4 rounded-xl shadow-md border-l-4 border-red-400">
            <strong>🔌 Tip 2:</strong> Don’t mix <span className="font-semibold">e-waste</span> with regular recyclables.
          </li>
          <li className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-400">
            <strong>🧼 Tip 3:</strong> Rinse food containers before adding them to dry waste to prevent bad odor.
          </li>
          <li className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-500">
            <strong>⚠️ Tip 4:</strong> Use a <span className="font-semibold">red bin</span> for hazardous or medical waste.
          </li>
        </ul>
      </main>
    </>
  );
};

export default TipsPage;
