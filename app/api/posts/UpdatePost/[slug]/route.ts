import { NextRequest, NextResponse } from "next/server";
import { validateAuthor, validateTitle, validateContent, updatePost } from "@/backend/posts";

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    const _id = params.slug;
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

    try {
        updatePost(_id, data.title, data.author, data.content);

        return NextResponse.redirect(new URL('/Blog/Dashboard', req.url));
    } catch {
        return NextResponse.json({ Error: 'Failed to update post' }, { status: 500 });
    }
}