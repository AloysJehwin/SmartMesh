import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('electric');
  const data = await db.collection('readings').find({}).sort({ timestamp: -1 }).toArray();
  res.status(200).json(data);
}
