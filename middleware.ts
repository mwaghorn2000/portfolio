
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    let cookie = request.cookies.get('token')
    try {
        const url = new URL('/api/tokenAuth', request.nextUrl.origin);
        const response = await fetch(url.toString(), {
            method: 'POST',
            body: JSON.stringify({ token: cookie?.value }),
            headers: {
                'content-type': 'application/json'
            }
        });
        if (!response.ok) {
            return NextResponse.redirect(new URL('/Blog/Login', request.url))
        }
    } catch (error: any) {
        console.error("Failed to fetch authorisation", error);
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/Blog/Dashboard',
}