import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">⚡ Electrical Monitoring System</h1>
        <p className="mb-6 text-gray-700">
          Welcome! Manage your electrical applications and monitor current sensor readings easily.
        </p>
        <div className="space-y-4">
          <Link href="/controls">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Go to Controls
            </button>
          </Link>
          <Link href="/monitoring">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
              Go to Monitoring
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
