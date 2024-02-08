import { NextRequest, NextResponse } from "next/server";
import { getPostMarkdown } from "@/backend/posts";
import { connectToDatabase } from "@/app/lib/mongodb";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const _id = params.slug;
    const { db } = await connectToDatabase();
    const post = await getPostMarkdown(db, _id);

    if (post === null) {
        return new Response('Error: No posts found', {
            status: 404
        });
    }

    return Response.json({ post });
    
} 