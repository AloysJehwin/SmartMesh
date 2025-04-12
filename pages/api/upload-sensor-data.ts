import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const client = await clientPromise;
    const db = client.db("power_monitoring");
    const collection = db.collection("readings");

    const result = await collection.insertOne(req.body);
    res.status(200).json({ message: "Data uploaded to MongoDB", id: result.insertedId });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload to MongoDB", error });
  }
}
