import { NextResponse } from 'next/server';
import { renderMarkdown } from '@/backend/markdown';
export async function POST(request: Request) {
    try {
        const data = await request.json();
        if (typeof data?.content !== 'string' || data.content.length > 200000) return NextResponse.json({ error: 'Preview content is invalid or too long' }, { status: 400 });
        return NextResponse.json({ html: renderMarkdown(data.content) });
    } catch { return NextResponse.json({ error: 'Preview could not be generated' }, { status: 400 }); }
}
