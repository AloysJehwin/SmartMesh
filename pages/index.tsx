import React from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-6 py-12 bg-gradient-to-br from-green-100 to-green-200 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 drop-shadow-lg mb-4 animate-fade-in">
          ♻️ Waste Segregation Dashboard
        </h1>
        <p className="text-lg md:text-xl text-green-900 mb-8 max-w-2xl">
          Track your household waste, reduce landfill impact, and learn proper segregation techniques for a cleaner, greener planet 🌍
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="/log"
            className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all shadow-md"
          >
            Log Waste
          </a>
          <a
            href="/summary"
            className="px-6 py-3 rounded-xl bg-white text-green-700 border border-green-700 font-semibold hover:bg-green-50 transition-all shadow-md"
          >
            View Summary
          </a>
          <a
            href="/tips"
            className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition-all shadow-md"
          >
            Get Tips
          </a>
        </div>
      </main>
    </>
  );
}
