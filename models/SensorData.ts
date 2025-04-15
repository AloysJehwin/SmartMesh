import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema({
  appliance1: { type: Number, required: true },
  appliance2: { type: Number, required: true },
  appliance3: { type: Number, required: true },
  timestamp: { type: String, required: true },
});

const SensorData = mongoose.models.SensorData || mongoose.model("SensorData", SensorDataSchema);

export default SensorData;
