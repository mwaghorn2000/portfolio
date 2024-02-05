import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from '@/backend/auth';

export async function POST(
    request: NextRequest
) {
    const data = await request.json();
    if (await verifyToken(data.token)) {
        return NextResponse.json({ login: 'verified' }, { status: 200 });
    } else {
        return NextResponse.json({ login: 'failed' }, { status: 401 });
    }
}