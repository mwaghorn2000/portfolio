import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/app/lib/mongodb';
import { getPosts } from '@/backend/posts';
export const dynamic = 'force-dynamic'

export async function GET(res: NextApiResponse, req: NextApiRequest) {
    const { db } = await connectToDatabase();
    const posts = await getPosts(db);

    return Response.json({ posts });
}

export async function POST(res: NextApiResponse, req: NextApiRequest) {

}