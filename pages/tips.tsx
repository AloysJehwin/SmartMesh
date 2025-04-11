import React from 'react';
import Navbar from '../components/Navbar';

const TipsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Segregation Tips</h2>
        <ul className="list-disc pl-6">
          <li>Keep wet and dry waste separate.</li>
          <li>Don’t mix e-waste with recyclables.</li>
          <li>Rinse containers before putting in dry waste.</li>
          <li>Use a red bin for hazardous waste.</li>
        </ul>
      </main>
    </>
  );
};

export default TipsPage;
