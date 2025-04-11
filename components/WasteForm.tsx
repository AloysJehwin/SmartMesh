import { useState } from 'react';
import { WasteCategory, WasteEntry } from '../types/waste';
import { addWasteEntry } from '../utils/data';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

export default function WasteForm() {
  const [category, setCategory] = useState<WasteCategory>('Organic');
  const [weightKg, setWeightKg] = useState<number>(0);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: WasteEntry = {
      id: uuidv4(),
      date: new Date().toISOString(),
      category,
      weightKg,
    };
    addWasteEntry(newEntry);
    router.push('/summary');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value as WasteCategory)}>
          <option value="Organic">Organic</option>
          <option value="Recyclable">Recyclable</option>
          <option value="Hazardous">Hazardous</option>
          <option value="E-Waste">E-Waste</option>
        </select>
      </label>
      <label>
        Weight (kg):
        <input
          type="number"
          step="0.1"
          value={weightKg}
          onChange={(e) => setWeightKg(parseFloat(e.target.value))}
          required
        />
      </label>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
