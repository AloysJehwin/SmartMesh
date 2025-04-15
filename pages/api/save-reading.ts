import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const client = await clientPromise;
  const db = client.db('power_monitoring');
  const collection = db.collection('readings');

  const { appliance1, appliance2, appliance3, timestamp } = req.body;

  await collection.insertOne({
    appliance1,
    appliance2,
    appliance3,
    timestamp: new Date(timestamp),
  });

  res.status(200).json({ message: 'Reading saved' });
}
