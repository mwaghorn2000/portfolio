import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const unauthorized = () => request.nextUrl.pathname.startsWith('/api/')
        ? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        : NextResponse.redirect(new URL('/Blog/Login', request.url));
    const token = request.cookies.get('token')?.value;
    if (!token) return unauthorized();

    try {
        const response = await fetch(new URL('/api/tokenAuth', request.nextUrl.origin), {
            method: 'POST',
            body: JSON.stringify({ token }),
            headers: { 'content-type': 'application/json' },
            cache: 'no-store',
        });
        if (!response.ok) return unauthorized();
    } catch {
        return unauthorized();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/Blog/Dashboard/:path*',
        '/api/posts/CreatePost',
        '/api/posts/UpdatePost/:path*',
        '/api/posts/dashboard/:path*',
    ],
};