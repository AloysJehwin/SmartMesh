import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  try {
    const client = await clientPromise;
    const db = client.db("power_monitoring");
    const collection = db.collection("readings");

    console.log("Connected to MongoDB");

    const pastReadings = await collection
      .find({})
      .sort({ timestamp: 1 })
      .limit(20)
      .toArray();

    console.log("Fetched readings:", pastReadings.length);

    res.status(200).json(pastReadings);
  } catch (error) {
    console.error("Fetch history error:", error);
    res.status(500).json({ message: "Failed to fetch history from MongoDB", error });
  }
}
