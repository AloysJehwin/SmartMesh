import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const SummaryPage: React.FC = () => {
  const [wasteLogs, setWasteLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch waste data from the API when the component mounts
  useEffect(() => {
    const fetchWasteLogs = async () => {
      try {
        const response = await fetch('/api/getData');
        if (!response.ok) {
          throw new Error('Failed to fetch waste data');
        }
        const data = await response.json();
        setWasteLogs(data); // Set the waste logs state
      } catch (err) {
        setError('Failed to fetch waste logs');
        console.error('Error fetching waste data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWasteLogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] px-6 py-12 bg-gradient-to-br from-white to-green-50 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-green-800 mb-6 animate-fade-in">
          🗑️ Waste Segregation Summary
        </h1>
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Logged Waste Entries</h2>
          <div className="space-y-4">
            {wasteLogs.length > 0 ? (
              wasteLogs.map((log: any) => (
                <div key={log._id} className="bg-green-100 p-4 rounded-lg shadow-md">
                  <p><strong>Category:</strong> {log.category}</p>
                  <p><strong>Amount:</strong> {log.amount} kg</p>
                  <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No waste logs found.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default SummaryPage;
