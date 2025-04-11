import React from 'react';
import Navbar from '../components/Navbar';
import WasteSummary from '../components/WasteSummary';

const SummaryPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <WasteSummary />
      </main>
    </>
  );
};

export default SummaryPage;
