import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to Waste Segregation Dashboard</h1>
        <p className="mt-2">Track your household waste and learn how to segregate properly.</p>
      </main>
    </>
  );
}
