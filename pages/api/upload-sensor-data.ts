import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const client = await clientPromise;

    // ✅ Use a new MongoDB database
    const db = client.db("home_energy_monitor");

    // Collection name remains the same, or you can rename it
    const collection = db.collection("readings");

    const { totalPower } = req.body;

    const newReading = {
      total_power_consumed: totalPower,
      timestamp: new Date(),
    };

    const result = await collection.insertOne(newReading);

    res.status(200).json({
      message: "Data uploaded to MongoDB (new DB: home_energy_monitor)",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload to MongoDB", error });
  }
}
