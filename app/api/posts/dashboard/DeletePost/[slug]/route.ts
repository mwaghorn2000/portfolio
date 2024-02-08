import { deletePost } from "@/backend/posts";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { slug: string }}) {
    await deletePost(params.slug);

    return NextResponse.json({message: 'deleted post' }, { status: 200 });
}