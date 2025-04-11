import React from 'react';
import Navbar from '../components/Navbar';
import WasteForm from '../components/WasteForm';

const LogPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <WasteForm />
      </main>
    </>
  );
};

export default LogPage;
