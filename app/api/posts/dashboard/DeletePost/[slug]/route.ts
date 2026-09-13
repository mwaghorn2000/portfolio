import { deletePost } from '@/backend/posts';
import { postErrorResponse } from '@/backend/postRequest';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        await deletePost(params.slug);
        return NextResponse.json({ message: 'deleted post' });
    } catch (error) {
        return postErrorResponse(error);
    }
}