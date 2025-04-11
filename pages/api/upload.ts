import { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from "../../lib/mongodb";

const uploadData = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { category, amount, timestamp } = req.body;

    if (!category || !amount || !timestamp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const db = await dbConnect();
      const collection = db.collection('wasteLogs');
      
      // Insert data into the collection
      const result = await collection.insertOne({ category, amount, timestamp });

      // Use the insertedId to fetch the inserted document (if necessary)
      const insertedData = await collection.findOne({ _id: result.insertedId });

      return res.status(201).json({
        message: 'Data uploaded successfully',
        data: insertedData,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to upload data',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default uploadData;
