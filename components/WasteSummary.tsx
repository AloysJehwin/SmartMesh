import { getWasteEntries } from '../utils/data';

export default function WasteSummary() {
  const entries = getWasteEntries();

  const totalPerCategory = entries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + entry.weightKg;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Waste Summary</h2>
      {Object.entries(totalPerCategory).map(([category, total]) => (
        <p key={category}>
          {category}: {total.toFixed(2)} kg
        </p>
      ))}
    </div>
  );
}
