import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const client = await clientPromise;
                const db = client.db('blog-posts');
                const posts = await db.collection('posts').find({}).toArray();
                res.status(200).json(posts);
            } catch (e:any) {
                res.status(500).json({ error: e.message });
            }
            break;

        case 'POST':
            try {
                const client = await clientPromise;
                const db = client.db('blog-posts');
                const post = req.body;
                const response = await db.collection('posts').insertOne(JSON.parse(post));
                res.status(201).json(response);
            } catch (e: any) {
                res.status(500).json({ error: e.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
