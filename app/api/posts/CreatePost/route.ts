import { NextRequest, NextResponse } from "next/server";
import { validateAuthor, validateTitle, validateContent, submitData } from "@/backend/posts";

export async function POST(req: NextRequest) {
    // form data
    const data = await req.json();

    if (validateTitle(data.title).error !== undefined) {
        console.log(validateTitle(data.title).error);
        return NextResponse.json({ error: "invalid title" }, { status: 403 });
    }

    if (validateAuthor(data.author).error !== undefined) {
        console.log(validateAuthor(data.author).error);
        return NextResponse.json({ error: "invlaid auther" }, { status: 403 });
    }

    if (validateContent(data.content).error !== undefined) {
        console.log(validateContent(data.content).error);
        return NextResponse.json({ error: "invalid content" }, {status: 403 });
    }

    submitData(data);

    return NextResponse.json({ status: 200 });
}