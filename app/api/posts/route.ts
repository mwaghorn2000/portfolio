import { connectToDatabase } from '@/app/lib/mongodb';
import { getPosts } from '@/backend/posts';
import { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
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