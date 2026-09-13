import { connectToDatabase } from '@/app/lib/mongodb';
import { validateLogin } from '@/backend/auth';
import { NextResponse, NextRequest } from 'next/server';
export async function POST(request: NextRequest) {
    let data;
    try { data = await request.json(); } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }); }
    if (!data || typeof data.username !== 'string' || typeof data.password !== 'string' || !data.username.trim() || !data.password) {
        return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }
    try {
        const { db } = await connectToDatabase();
        const result = await validateLogin(db, data.username, data.password);
        if (!result.token) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        const response = NextResponse.json({ message: 'Signed in' });
        response.cookies.set('token', result.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 86400 });
        return response;
    } catch { return NextResponse.json({ error: 'Sign-in unavailable' }, { status: 500 }); }
}
