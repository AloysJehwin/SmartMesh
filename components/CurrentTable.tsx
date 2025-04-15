export default function CurrentTable({
    readings,
  }: {
    readings: {
      timestamp: string;
      appliance1: number;
      appliance2: number;
      appliance3: number;
    }[];
  }) {
    return (
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Timestamp</th>
              <th className="border px-4 py-2">Appliance 1 (A)</th>
              <th className="border px-4 py-2">Appliance 2 (A)</th>
              <th className="border px-4 py-2">Appliance 3 (A)</th>
            </tr>
          </thead>
          <tbody>
            {readings.map((r, i) => (
              <tr key={i} className="text-center">
                <td className="border px-4 py-2">{new Date(r.timestamp).toLocaleString()}</td>
                <td className="border px-4 py-2">{r.appliance1}</td>
                <td className="border px-4 py-2">{r.appliance2}</td>
                <td className="border px-4 py-2">{r.appliance3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  