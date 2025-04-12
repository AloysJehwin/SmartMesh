type SensorCardProps = {
    name: string;
    value: number;
  };
  
  export default function SensorCard({ name, value }: SensorCardProps) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">{value.toFixed(2)} A</p>
      </div>
    );
  }
  