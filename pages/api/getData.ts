// pages/api/getData.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../lib/mongodb";
import mongoose from "mongoose";

// Define a simple Mongoose model (or import it from another file)
const WasteLogSchema = new mongoose.Schema({}, { strict: false });
const WasteLog = mongoose.models.WasteLog || mongoose.model("WasteLog", WasteLogSchema);

const getData = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await dbConnect(); // Connect to MongoDB using Mongoose

      const wasteLogs = await WasteLog.find({}).lean(); // Fetch all documents
      res.status(200).json(wasteLogs);
    } catch (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default getData;
