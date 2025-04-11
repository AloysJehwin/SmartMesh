import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 bg-green-600 text-white flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/log">Log Waste</Link>
      <Link href="/summary">Summary</Link>
      <Link href="/tips">Tips</Link>
    </nav>
  );
};

export default Navbar;
