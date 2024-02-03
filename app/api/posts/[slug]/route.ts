import { connectToDatabase } from "@/app/lib/mongodb";
import { getPost } from "@/backend/posts";

export async function GET( 
    req: Request, 
    { params }: { params: { slug: string } }
) {
    const slug = params.slug;
    const { db } = await connectToDatabase();
    const post = await getPost(db, slug);

    if (post === null) {
        return new Response('Error: No posts found', {
            status: 404
        });
    }

    return Response.json({ post });
}
