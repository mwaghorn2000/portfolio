import { connectToDatabase } from "@/app/lib/mongodb"
import { validateLogin } from '@/backend/auth';
import { NextResponse, NextRequest } from "next/server";

export async function POST(
    request: NextRequest
) {
    const { db } = await connectToDatabase();

    const data = await request.json();

    const loginStatus = await validateLogin(db, data.username, data.password);

    if (loginStatus.message === "Invalid Credentials") {
        return NextResponse.json(
            {
                Error: 'Invalid Credentials'
            },
            { status: 401 }
        )
    } else {
        const response = NextResponse.json(
            { token: await loginStatus.token },
            { status: 200 }
        )

        return response;
    }
}