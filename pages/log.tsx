import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import WasteForm from '../components/WasteForm';

const LogPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);

  // Function to generate random data
  const generateRandomData = () => {
    const randomWasteCategories = ['Organic', 'Plastic', 'Glass', 'Metal', 'E-Waste'];
    const randomAmount = (Math.random() * 10).toFixed(2); // Generates random waste amount (0 to 10 kg)
    
    const data = {
      category: randomWasteCategories[Math.floor(Math.random() * randomWasteCategories.length)],
      amount: randomAmount,
      timestamp: new Date().toISOString(),
    };
    
    return data;
  };

  // Function to simulate data fetch and upload
  const handleFetchData = async () => {
    setIsLoading(true);
    const data = generateRandomData();
    setGeneratedData(data);

    // Send data to API for storage in MongoDB
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Data uploaded:', responseData);
        setUploadSuccess(true);
      } else {
        throw new Error('Failed to upload data');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      setUploadSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] px-6 py-12 bg-gradient-to-br from-white to-green-50 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-green-800 mb-6 animate-fade-in">
          📝 Log Your Waste
        </h1>
        <p className="text-md text-green-700 mb-8 max-w-xl text-center">
          Help keep the planet clean by recording your waste segregation activities regularly.
        </p>
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">
          <WasteForm />
        </div>
        <div className="mt-8">
          <button
            onClick={handleFetchData}
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg text-white font-bold ${isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} transition-all`}
          >
            {isLoading ? 'Fetching Data...' : 'Fetch Data & Upload'}
          </button>
          {generatedData && !isLoading && (
            <div className="mt-4 p-4 bg-yellow-100 rounded-lg shadow-md">
              <h3 className="font-semibold text-yellow-800">Generated Data:</h3>
              <p><strong>Category:</strong> {generatedData.category}</p>
              <p><strong>Amount:</strong> {generatedData.amount} kg</p>
              <p><strong>Timestamp:</strong> {generatedData.timestamp}</p>
            </div>
          )}
          {uploadSuccess !== null && (
            <div className={`mt-4 p-4 rounded-lg ${uploadSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className={`font-semibold ${uploadSuccess ? 'text-green-800' : 'text-red-800'}`}>
                {uploadSuccess ? 'Data uploaded successfully!' : 'Failed to upload data.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default LogPage;
