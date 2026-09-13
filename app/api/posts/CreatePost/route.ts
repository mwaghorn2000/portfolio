import { NextRequest, NextResponse } from 'next/server';
import { submitData } from '@/backend/posts';
import { readPostData, postErrorResponse } from '@/backend/postRequest';

export async function POST(req: NextRequest) {
    try {
        const data = await readPostData(req);
        await submitData(data);
        return NextResponse.json({ status: 200 });
    } catch (error) {
        return postErrorResponse(error);
    }
}