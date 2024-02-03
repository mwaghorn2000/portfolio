import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/app/lib/mongodb';
import { getPosts } from '@/backend/posts';
export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const posts = await getPosts(db);
        return Response.json({ posts });
    } catch {
        return new Response('Error: Failed to fetch posts', {
            status: 500
        });
    }
}