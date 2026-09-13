import { NextRequest, NextResponse } from 'next/server';
import { updatePost } from '@/backend/posts';
import { readPostData, postErrorResponse } from '@/backend/postRequest';

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { title, author, content } = await readPostData(req);
        await updatePost(params.slug, title, author, content);
        return NextResponse.json({ message: 'updated post' });
    } catch (error) {
        return postErrorResponse(error);
    }
}