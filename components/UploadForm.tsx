import { useState } from 'react';

export default function UploadForm({ onUpload }: { onUpload: () => void }) {
  const [current, setCurrent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ current: parseFloat(current), timestamp: new Date() }),
    });
    setCurrent('');
    onUpload();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="number"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        placeholder="Enter current (A)"
        className="border p-2 rounded w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
    </form>
  );
}
