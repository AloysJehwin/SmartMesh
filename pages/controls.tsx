import ControlPanel from '../components/ControlPanel';

export default function ControlsPage() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Electrical Controls</h1>
      <ControlPanel />
    </div>
  );
}
