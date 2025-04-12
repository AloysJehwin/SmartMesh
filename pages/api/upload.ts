import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const client = await clientPromise;
    const db = client.db('electric');
    await db.collection('readings').insertOne(req.body);
    res.status(200).json({ message: 'Uploaded' });
  } else {
    res.status(405).end();
  }
}
